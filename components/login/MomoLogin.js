import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View
} from "react-native";

export default function MomoLogin() {
  return (
    <SafeAreaView style={styles.styContainer}>
      {/* Hien keyboard (khi go password) se KO che chu dang hien tren form
      nhung voi TH form qua dai thi phai dung "react-native-keyboard-aware-scroll-view" (RegisterForm.js)
      -> khi dung thi KO can 2 cai nay luon: "KeyboardAvoidingView" & "Keyboard.dismiss" */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.styContent}>
            <View style={styles.textWrapper}>
              <Text style={styles.styHiText}>Xin chào!</Text>
              <Text style={styles.styText}>
                ID: <Text style={styles.styHighlightText}>DoTQ</Text></Text>
              <Text style={[styles.styText, { color: 'blue', }]}>SDT: 0123456789</Text>
            </View>

            <View style={styles.styForm}>
              {/* https://docs.expo.io/guides/icons */}
              {/* https://fontawesome.com/icons */}
              <FontAwesome5 name="lock" style={styles.iconLock} />

              {/* https://reactnative.dev/docs/textinput */}
              <TextInput
                style={styles.styInputPassword}
                keyboardType="numeric"
                secureTextEntry={true}
                // autoFocus={true}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#929292"
              />

              {/* https://reactnative.dev/docs/touchableopacity */}
              <TouchableOpacity style={styles.styButtonLogin}>
                <Text style={styles.styButtonLoginText}>ĐĂNG NHẬP</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.styOtherAction}>
              <TouchableOpacity>
                <Text style={styles.styText}>QUÊN MẬT KHẨU</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.styText}>THOÁT TÀI KHOẢN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const COMMON_TEXT = {
  color: "#fff",
  textAlign: "center",
};

const styles = StyleSheet.create({
  styContainer: {
    flex: 1,
    backgroundColor: "#b0006d",
    // SafeAreaView on Android devices (iOS can NOT use padding with "SafeAreaView")
    paddingTop: Constants.statusBarHeight,
  },
  styContent: {
    paddingHorizontal: 30,
  },
  textWrapper: {
    marginTop: 60,
    marginBottom: 30,
  },
  styHiText: {
    // https://javascript.info/rest-parameters-spread#spread-syntax
    ...COMMON_TEXT,
    fontSize: 20,
    lineHeight: 50,
    fontWeight: "bold",
  },
  styText: {
    ...COMMON_TEXT,
    fontSize: 16,
    lineHeight: 30,
  },
  styForm: {
    marginBottom: 30,
  },
  iconLock: {
    color: "#929292",
    position: "absolute", // KO co "absolute" thi se KO can giua vertical
    fontSize: 16,
    top: 22,
    left: 22,
    zIndex: 10,
  },
  styInputPassword: {
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 30,
    fontSize: 20,
    color: "#929292",
    backgroundColor: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  styButtonLogin: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8d015a",
    justifyContent: "center",
    marginTop: 15,
  },
  styButtonLoginText: {
    ...COMMON_TEXT,
  },
  styOtherAction: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  styHighlightText: {
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "#fff",
    backgroundColor: "#59595d",
  },
})