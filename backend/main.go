package main

import (
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Set Gin to release mode in production
	gin.SetMode(gin.ReleaseMode)

	// Initialize the Gin router
	r := gin.Default()

	// enable CORS
	r.Use(cors.Default())

	// Trust only localhost proxies (or disable if not using proxies)
	r.SetTrustedProxies([]string{"127.0.0.1"})

	// Endpoint to handle image upload and enhancement
	r.POST("/enhance", func(c *gin.Context) {
		// Step 1: Receive the image from the frontend
		file, err := c.FormFile("image")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No image uploaded"})
			return
		}

		// Step 2: Save the uploaded image temporarily
		uploadDir := "./uploads"
		if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
			return
		}

		filePath := filepath.Join(uploadDir, file.Filename)
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}

		// Step 3: Call the Python script to enhance the image
		outputPath := filepath.Join(uploadDir, "enhanced_"+file.Filename)
		cmd := exec.Command("python3", "../model/test.py", filePath, outputPath, "../model/models/RRDB_ESRGAN_x4.pth")
		output, err := cmd.CombinedOutput()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to enhance image",
				"details": string(output),
			})
			return
		}

		// Step 4: Return the enhanced image to the frontend
		c.File(outputPath)
	})

	// Start the server on port 8080
	fmt.Println("Server is running on http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
