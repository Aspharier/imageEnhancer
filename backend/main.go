package main

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Function to generate a unique filename
func generateUniqueFilename(extension string) string {
	randBytes := make([]byte, 8)
	rand.Read(randBytes)
	return hex.EncodeToString(randBytes) + extension
}

// Function to clean up old files in the uploads directory
func cleanupUploads(uploadDir string, maxAge time.Duration, maxFiles int) {
	for {
		files, err := os.ReadDir(uploadDir)
		if err != nil {
			log.Printf("Failed to read upload directory: %v", err)
			continue
		}

		// Delete files older than maxAge
		for _, file := range files {
			info, err := file.Info()
			if err != nil {
				log.Printf("Failed to get file info: %v", err)
				continue
			}

			if time.Since(info.ModTime()) > maxAge {
				filePath := filepath.Join(uploadDir, file.Name())
				if err := os.Remove(filePath); err != nil {
					log.Printf("Failed to delete file: %v", err)
				} else {
					log.Printf("Deleted old file: %s", filePath)
				}
			}
		}

		// Limit the number of files in the directory
		if len(files) > maxFiles {
			// Sort files by modification time (oldest first)
			sort.Slice(files, func(i, j int) bool {
				infoI, _ := files[i].Info()
				infoJ, _ := files[j].Info()
				return infoI.ModTime().Before(infoJ.ModTime())
			})

			// Delete the oldest files
			for i := 0; i < len(files)-maxFiles; i++ {
				filePath := filepath.Join(uploadDir, files[i].Name())
				if err := os.Remove(filePath); err != nil {
					log.Printf("Failed to delete file: %v", err)
				} else {
					log.Printf("Deleted old file: %s", filePath)
				}
			}
		}

		time.Sleep(1 * time.Hour) // Run cleanup every hour
	}
}

func main() {
	// Set Gin to release mode in production
	gin.SetMode(gin.ReleaseMode)

	// Initialize the Gin router
	r := gin.Default()

	// Enable CORS
	r.Use(cors.Default())

	// Trust only localhost proxies (or disable if not using proxies)
	r.SetTrustedProxies([]string{"127.0.0.1"})

	// Create the uploads directory if it doesn't exist
	uploadDir := "./uploads"
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		log.Fatalf("Failed to create upload directory: %v", err)
	}

	// Start the cleanup task
	go cleanupUploads(uploadDir, 24*time.Hour, 100) // Delete files older than 24 hours and keep only the 100 most recent files

	// Endpoint to handle image upload and enhancement
	r.POST("/enhance", func(c *gin.Context) {
		// Step 1: Receive the image from the frontend
		file, err := c.FormFile("image")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No image uploaded"})
			return
		}

		log.Printf("Received file: %s, size: %d", file.Filename, file.Size)

		// Step 2: Save the uploaded image temporarily
		inputFilename := generateUniqueFilename(filepath.Ext(file.Filename))
		outputFilename := "enhanced_" + generateUniqueFilename(filepath.Ext(file.Filename))

		filePath := filepath.Join(uploadDir, inputFilename)
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}

		// Step 3: Call the Python script to enhance the image
		outputPath := filepath.Join(uploadDir, outputFilename)
		cmd := exec.Command("python3", "../model/test.py", filePath, outputPath, "../model/models/RRDB_ESRGAN_x4.pth")
		output, err := cmd.CombinedOutput()
		if err != nil {
			log.Printf("Python script error: %v", err)
			log.Printf("Python script output: %s", string(output))
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to enhance image",
				"details": string(output),
			})
			return
		}

		// Step 4: Return the enhanced image to the frontend
		c.File(outputPath)

		// Step 5: Clean up temporary files
		defer func() {
			if err := os.Remove(filePath); err != nil {
				log.Printf("Failed to delete input file: %v", err)
			}
			if err := os.Remove(outputPath); err != nil {
				log.Printf("Failed to delete output file: %v", err)
			}
		}()
	})

	// Start the server on port 8080
	fmt.Println("Server is running on http://localhost:8080")
	if err := r.Run("0.0.0.0:8080"); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}

