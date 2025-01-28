import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { PropsWithChildren } from "react";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RobotoMono_300Light, useFonts } from "@expo-google-fonts/roboto-mono";

const placeHolderImage = require("../assets/images/sample3.png");

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose(): void;
}>;

export default function ImageViewer({ isVisible, onClose }: Props) {
  const [loaded] = useFonts({
    RobotoMono_300Light,
  });

  if (!loaded) {
    return null;
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <AntDesign name="closecircleo" size={40} color="#FBFDFC" />
          </Pressable>
          <View style={styles.imageContainer}>
            <Image source={placeHolderImage} style={styles.image} />
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
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
