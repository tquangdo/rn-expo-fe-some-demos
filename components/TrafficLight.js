import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableHighlight,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import imgTrafficLight from "./assets/the-light/traffic-light.png";
import imgTrafficLightGreen from "./assets/the-light/traffic-light-green.png";
import imgTrafficLightYellow from "./assets/the-light/traffic-light-yellow.png";
import imgTrafficLightRed from "./assets/the-light/traffic-light-red.png";

export default function TrafficLight() {
  const [staColor, setStaColor] = useState("");

  let imageSource = imgTrafficLight;
  if (staColor === "red") {
    imageSource = imgTrafficLightRed;
  } else if (staColor === "yellow") {
    imageSource = imgTrafficLightYellow;
  } else if (staColor === "green") {
    imageSource = imgTrafficLightGreen;
  }

  return (
    <SafeAreaView style={styles.styContainer}>
      <StatusBar style="light" />

      <Image fadeDuration={0} source={imageSource} style={styles.styImage} />

      <View style={styles.styOSView}>
        <Text style={styles.styOSText}>Platform: {Platform.OS}</Text>
      </View>
      <View style={styles.buttonGroup}>
        {/* https://reactnative.dev/docs/touchablehighlight */}
        <TouchableHighlight
          style={[styles.styButton, { backgroundColor: "#ce0100" }]}
          underlayColor="#9b0100"
          onPress={() => setStaColor("red")}
        >
          <Text style={styles.buttonText}>Red</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.styButton, { backgroundColor: "yellow" }]}
          underlayColor="#cc6900"
          onPress={() => setStaColor("yellow")}
        >
          <Text style={styles.buttonText}>Yellow</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.styButton, { backgroundColor: "#54a111" }]}
          underlayColor="#3c730c"
          onPress={() => setStaColor("green")}
        >
          <Text style={styles.buttonText}>Green</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  styContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
  },
  styImage: {
    maxWidth: "100%",
    maxHeight: screenHeight - Constants.statusBarHeight - 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  styButton: {
    width: 80,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "grey",
  },
  styOSView: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  styOSText: {
    color: "white",
  },
});