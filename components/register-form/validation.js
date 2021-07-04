import * as Yup from "yup";

// https://github.com/jquense/yup
export const validationSchemaByYup = Yup.object().shape({
    formikFirstName: Yup.string().required("Phải nhập First Name!!!")
        .min(2, "Quá ngắn!!!")
        .max(10, "Quá dài!!!"),
    formikLastName: Yup.string().required("Phải nhập Last Name!!!"),
    formikEmail: Yup.string()
        .email("Enter a valid email")
        .required("Please enter a registered email"),
    formikPassword: Yup.string()
        .required("Please enter a password")
        .min(6, "Password must have at least 6 characters"),
    formikConfirmPassword: Yup.string()
        .required("Please confirm password")
        .oneOf([Yup.ref("password")], "Password & Confirm Password does not match"),
});