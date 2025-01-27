import { Text, View, StyleSheet, StatusBar } from "react-native";
import {
  RobotoMono_500Medium_Italic,
  useFonts,
} from "@expo-google-fonts/roboto-mono";
import { RobotoMono_300Light } from "@expo-google-fonts/roboto-mono";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded, error] = useFonts({
    RobotoMono_500Medium_Italic,
    RobotoMono_300Light,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#151618" />
      <Text style={styles.headerText}>Image</Text>
      <Text style={styles.headerText}>Enhancer</Text>
      <View style={styles.iconContainer}>
        <AntDesign name="pluscircleo" size={150} color="#94999F" />
        <Text style={styles.iconText}>Tap anywhere to select a photo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#151618",
    flex: 1,
  },
  headerText: {
    paddingLeft: 10,
    fontFamily: "RobotoMono_500Medium_Italic",
    color: "#FBFDFC",
    fontSize: 50,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontFamily: "RobotoMono_300Light",
    color: "#94999F",
    fontSize: 15,
    padding: 20,
    letterSpacing: 1,
  },
});
