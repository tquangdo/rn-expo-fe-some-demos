import React, { useState, useRef } from "react";
import { StyleSheet, SafeAreaView, Text, View, Animated } from "react-native";
import Constants from "expo-constants";
import DisplayResult from "./components/rock-paper-scissors/DisplayResult";
import Actions from "./components/rock-paper-scissors/Actions";
import { DRAW, LOSE, WIN } from "./components/rock-paper-scissors/constants";

export default function RockPaperScissors() {
  const [staUserChoice, setStaUserChoice] = useState(0);
  const [staComputerChoice, setStaComputerChoice] = useState(0);
  const [staResult, setStaResult] = useState("");
  const [staCanPlay, setStaCanPlay] = useState(true);

  // https://reactjs.org/docs/hooks-reference.html#useref
  const fadeAnimation = useRef(new Animated.Value(1)).current; // Initial value for opacity: 1

  function onPlay(arg_choice) {
    // 1 = rock, 2 = paper, 3 = scissors
    const randomComputerChoice = Math.floor(Math.random() * 3) + 1;
    let resultString = "";

    if (arg_choice === 1) {
      resultString = randomComputerChoice === 3 ? WIN : LOSE;
    } else if (arg_choice === 2) {
      resultString = randomComputerChoice === 1 ? WIN : LOSE;
    } else {
      resultString = randomComputerChoice === 2 ? WIN : LOSE;
    }

    if (arg_choice === randomComputerChoice) {
      resultString = DRAW;
    }

    setStaUserChoice(arg_choice);
    setStaComputerChoice(randomComputerChoice);

    // Wait animation hide old result
    setTimeout(() => {
      setStaResult(resultString);
    }, 300);

    // Animation hide old result and show new result
    // https://reactnative.dev/docs/animations
    Animated.sequence([
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Disable action when animation running
    setStaCanPlay(false);
    setTimeout(() => {
      setStaCanPlay(true);
    }, 500);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{ alignItems: "center" }}>
          <Text>Chơi oẳn tù xì (DoTQ)</Text>
        </View>
        <View style={styles.result}>
          <Animated.Text
            style={[styles.resultText, { opacity: fadeAnimation }]}
          >
            {staResult}
          </Animated.Text>
        </View>

        <View style={styles.screen}>
          {!staResult ? (
            <Text style={styles.readyText}>Let's Play!</Text>
          ) : (
            // hien trai la "You", phai la "Computer"
            <DisplayResult
              props_userChoice={staUserChoice}
              props_computerChoice={staComputerChoice}
            />
          )}
        </View>
        {/* trong luc dang choi oan tu xi thi KO duoc click nua!!! */}
        <Actions props_play={onPlay} props_canPlay={staCanPlay} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  result: {
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  resultText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  screen: {
    flex: 1,
    flexDirection: "row",
  },
  readyText: {
    marginTop: -48,
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
    fontSize: 48,
    fontWeight: "bold",
  },
})