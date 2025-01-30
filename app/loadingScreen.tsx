import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

type LoadingScreenProps = {
  navigation: any;
  route: any;
};

const LoadingScreen = ({ navigation, route }: LoadingScreenProps) => {
  const { imageUri } = route.params;

  useEffect(() => {
    const enhanceImage = async () => {
      try {
        const formData = new FormData();
        formData.append("image", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        } as any);

        const response = await fetch("http://192.168.214.42:8080/enhance", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to enhance image");
        }

        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          navigation.replace("EnhancedImage", { enhancedImage: base64data });
        };
      } catch (error) {
        console.error("Error enhancing image:", error);
        navigation.goBack();
      }
    };

    enhanceImage();
  }, [imageUri, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#72D3FE" />
      <Text style={styles.text}>Enhancing your image...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151618",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#FBFDFC",
    fontFamily: "RobotoMono_300Light",
  },
});

export default LoadingScreen;
