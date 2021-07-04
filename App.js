import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React from "react";
import {
  Alert, SafeAreaView, Text,
  TouchableOpacity, View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormField from "./components/register-form/FormField";
import { styles } from "./components/register-form/styles";
import { validationSchemaByYup } from "./components/register-form/validation";

export default function RegisterForm() {
  function onSubmitHandler(values) {
    // https://reactnative.dev/docs/alert
    Alert.alert(
      "Register Successfully!",
      "Form data: " + JSON.stringify(values)
    );
  }

  function isFormValid(isValid, touched) {
    return isValid && Object.keys(touched).length !== 0;
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
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={150}
        >
          {/* https://formik.org/docs/guides/react-native */}
          <Formik
            // cai nay thay cho state neu KO dung "Formik" 
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
                  secureTextEntry={true}
                  ffValues={values}
                  ffTouched={touched}
                  ffErrors={errors}
                  ffOnHandleChange={handleChange}
                  ffOnHandleBlur={handleBlur}
                />

                <FormField
                  ffField="formikConfirmPassword"
                  ffLabel="Confirm Password"
                  secureTextEntry={true}
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