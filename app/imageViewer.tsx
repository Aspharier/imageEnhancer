import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import Entypo from "@expo/vector-icons/Entypo";
import { RobotoMono_300Light, useFonts } from "@expo-google-fonts/roboto-mono";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Loading: { imageUri: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Loading">;

const placeHolderImage = require("../assets/images/sample6.jpg");

type Props = {
  isVisible: boolean;
  onClose(): void;
  selectedImage?: string;
};

export default function ImageViewer({
  isVisible,
  onClose,
  selectedImage,
}: Props) {
  const [loaded] = useFonts({
    RobotoMono_300Light,
  });

  const navigation = useNavigation<NavigationProp>();

  if (!loaded) {
    return null;
  }

  const handleEnhance = () => {
    if (selectedImage) {
      navigation.navigate("Loading", { imageUri: selectedImage });
      onClose();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Entypo name="cross" size={34} color="#FBFDFC" />
          </Pressable>
          <View style={styles.imageContainer}>
            <Image
              source={selectedImage ? { uri: selectedImage } : placeHolderImage}
              style={styles.image}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleEnhance}
          >
            <Text style={styles.buttonText}>Enhance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

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
