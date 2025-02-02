# Use an official Node.js runtime as the base image
FROM golang:1.23.5

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files
COPY backend/go.mod backend/go.sum ./

# Install dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN go build -o main ./backend/main.go

# Expose the port your backend server runs on
EXPOSE 5000

# Command to run your backend server
CMD ["./main"]
