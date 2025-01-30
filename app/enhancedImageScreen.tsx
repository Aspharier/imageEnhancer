import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image";
import Entypo from "@expo/vector-icons/Entypo";

type EnhancedImageScreenProps = {
  navigation: any;
  route: any;
};

const EnhancedImageScreen = ({
  navigation,
  route,
}: EnhancedImageScreenProps) => {
  const { enhancedImage } = route.params;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Entypo name="cross" size={34} color="#FBFDFC" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image source={{ uri: enhancedImage }} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Save Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#151618",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxWidth: 500,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  buttonContainer: {
    backgroundColor: "#72D3FE",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    fontFamily: "RobotoMono_300Light",
    fontSize: 30,
    color: "#151618",
  },
});

export default EnhancedImageScreen;
