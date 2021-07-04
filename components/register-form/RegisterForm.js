import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React from "react";
import {
  Alert, SafeAreaView, Text,
  TouchableOpacity, View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormField from "./FormField";
import { styles } from "./styles";
import { validationSchemaByYup } from "./validation";

export default function RegisterForm() {
  function onSubmitHandler(arg_values) {
    // https://reactnative.dev/docs/alert
    Alert.alert(
      "Register Successfully!",
      "Form data: " + JSON.stringify(arg_values)
    );
  }

  function isFormValid(arg_is_valid, arg_touched) {
    return arg_is_valid && Object.keys(arg_touched).length !== 0;
  }

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />

      <StatusBar style="light" />

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Register</Text>
        </View>

        {/* https://github.com/APSL/react-native-keyboard-aware-scroll-view */}
        <KeyboardAwareScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // co the click "Submit" ngay ca khi keyboard dang open
          extraScrollHeight={150}
        >
          {/* https://formik.org/docs/guides/react-native */}
          <Formik
            // cai nay thay cho state neu KO dung "Formik"
            // initialValues gia tri chinh la values
            initialValues={{
              formikFirstName: "",
              formikLastName: "",
              formikEmail: "",
              formikPassword: "",
              formikConfirmPassword: "",
            }}
            onSubmit={onSubmitHandler}
            validationSchema={validationSchemaByYup}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <FormField
                  ffField="formikFirstName"
                  ffLabel="First Name"
                  ffAutoCapitalize="words"
                  ffValues={values}
                  ffTouched={touched}
                  ffErrors={errors}
                  ffOnHandleChange={handleChange}
                  ffOnHandleBlur={handleBlur}
                />

                <FormField
                  ffField="formikLastName"
                  ffLabel="Last Name"
                  ffAutoCapitalize="words"
                  ffValues={values}
                  ffTouched={touched}
                  ffErrors={errors}
                  ffOnHandleChange={handleChange}
                  ffOnHandleBlur={handleBlur}
                />

                <FormField
                  ffField="formikEmail"
                  ffLabel="Email Address"
                  ffValues={values}
                  ffTouched={touched}
                  ffErrors={errors}
                  ffOnHandleChange={handleChange}
                  ffOnHandleBlur={handleBlur}
                />

                <FormField
                  ffField="formikPassword"
                  ffLabel="Password"
                  ffSecureTextEntry={true}
                  ffValues={values}
                  ffTouched={touched}
                  ffErrors={errors}
                  ffOnHandleChange={handleChange}
                  ffOnHandleBlur={handleBlur}
                />

                <FormField
                  ffField="formikConfirmPassword"
                  ffLabel="Confirm Password"
                  ffSecureTextEntry={true}
                  ffValues={values}
                  ffTouched={touched}
                  ffErrors={errors}
                  ffOnHandleChange={handleChange}
                  ffOnHandleBlur={handleBlur}
                />

                <TouchableOpacity
                  disabled={!isFormValid(isValid, touched)}
                  onPress={handleSubmit}
                >
                  <View
                    style={[
                      styles.button,
                      {
                        opacity: isFormValid(isValid, touched) ? 1 : 0.5,
                      },
                    ]}
                  >
                    <Text style={styles.buttonText}>SUBMIT</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}