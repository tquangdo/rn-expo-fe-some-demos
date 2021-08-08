import React from "react";
import {
  Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";
import FacebookBannerImage from "./assets/login-page/facebook-banner.jpg";

export default function FacebookLogin() {
  return (
    <>
      {/* https://reactnative.dev/docs/image */}
      <Image source={FacebookBannerImage} style={styles.banner} />
      <SafeAreaView style={styles.container}>
        {/* justifyContent: "space-between" giua 2 vung <View> */}
        <View style={styles.content}>
          <TextInput
            style={[styles.input, styles.inputUsername]}
            placeholder="Số điện thoại hoặc email"
            placeholderTextColor="#cdcdcf"
            // returnKeyType='google'
            autoFocus={true}
          />

          <TextInput
            style={[styles.input, styles.inputPassword]}
            secureTextEntry={true}
            placeholder="Mật khẩu"
            placeholderTextColor="#cdcdcf"
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Quay lại</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text> HOẶC </Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={[styles.button, styles.buttonRegister]}>
            <Text style={[styles.buttonText, styles.buttonRegisterText]}>
              Tạo tài khoản mới
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    resizeMode: "contain",
    width: "100%",
    height: null,
    aspectRatio: 750 / 460, // Image ratio
  },
  // "HOAC"("Số điện thoại hoặc email") nam duoi cung screen KO phu thuoc size smartphone
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    padding: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cdcdcf",
    color: "#333333",
    fontSize: 16,
    height: 44,
    paddingHorizontal: 15,
  },
  inputUsername: {
    borderBottomWidth: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  inputPassword: {
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  button: {
    height: 42,
    borderRadius: 6,
    backgroundColor: "#1977f3",
    justifyContent: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#b4cafb",
    textAlign: "center",
    fontSize: 16,
  },
  // "Quen mat khau" & "Quay lai" cach rong ra chu KO sat nhau lai
  link: {
    paddingVertical: 8,
  },
  linkText: {
    color: "#1c6ede",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    padding: 22,
    paddingBottom: 0,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#cbccd0",
  },
  buttonRegister: {
    width: "100%",
    backgroundColor: "#e7f3ff",
  },
  buttonRegisterText: {
    color: "#1077f7",
  },
})