import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
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
  const imageRef = useRef<View>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(false);

  // Request media library permissions
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(status === "granted");
    })();
  }, []);

  // Save image to media library
  const onSaveImageAsync = async () => {
    if (!hasMediaLibraryPermission) {
      alert("Permission to access media library is required to save images.");
      return;
    }

    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      console.log("Captured image URI:", localUri); // Debugging

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log("Error saving image:", e);
    }
  };

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
          <View ref={imageRef} collapsable={false}>
            <Image
              source={{ uri: enhancedImage }}
              style={{ width: 300, height: 300, borderRadius: 20 }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={onSaveImageAsync}
        >
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
