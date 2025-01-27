import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { PropsWithChildren } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose(): () => void;
}>;

export default function ImageViewer({ isVisible, onClose }: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <Pressable onPress={onClose}>
          <AntDesign name="closecircleo" size={24} color="white" />
        </Pressable>
        <Text>Hello From the MOdal itself</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "70%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
});
