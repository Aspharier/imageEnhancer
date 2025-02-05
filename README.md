# Image Enhancer

## Overview
Image Enhancer is a React Native application that allows users to enhance images using an ESRGAN (Enhanced Super-Resolution Generative Adversarial Network) model. The backend is developed in Go and handles image processing using the ESRGAN model.

## Preview

![imageTwik-ezgif com-optimize(1)](https://github.com/user-attachments/assets/3f4ff223-577f-4fe6-bff0-db654e72749a)


## Features
- Upload and enhance images using deep learning.
- Real-time image enhancement with high-quality output.
- Cross-platform support (Android & iOS).
- Responsive UI with smooth interactions.

## Technologies Used
### Frontend (React Native)
- React Native
- Expo
- React Navigation
- Axios

### Backend (Go)
- Gin
- Go CORS Middleware
- ESRGAN Model (for image enhancement)
- File handling & processing in Go

## Installation
### Prerequisites
- Node.js & npm/yarn
- React Native CLI or Expo CLI
- Go (latest version installed)

### Setup Backend
1. Clone the repository:
   ```sh
   git clone https://github.com/Aspharier/imageEnhancer.git
   cd image-enhancer/backend
   ```
2. Install dependencies:
   ```sh
   go mod tidy
   ```
3. Run the server:
   ```sh
   go run main.go
   ```
   The server should be running on `http://localhost:8080`.

### Setup Frontend
1. Navigate to the React Native project:
   ```sh
   cd ../app
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the React Native app:
   ```sh
   npx react-native run-android  # For Android
   npx react-native run-ios      # For iOS
   ```

## Usage
1. Launch the app on your mobile device/emulator.
2. Upload an image from your gallery or capture one using the camera.
3. Click on the **Enhance** button.
4. The app sends the image to the backend, where the ESRGAN model enhances it.
5. The enhanced image is returned and displayed in the app.

