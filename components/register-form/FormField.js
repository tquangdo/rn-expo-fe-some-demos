import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";

export default function FormField({
    ffField,
    ffLabel,
    ffSecureTextEntry,
    ffAutoCapitalize,
    ffValues,
    ffTouched,
    ffErrors,
    ffOnHandleChange,
    ffOnHandleBlur,
}) {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{ffLabel}</Text>

            <TextInput
                style={styles.input}
                value={ffValues[ffField]}
                onChangeText={ffOnHandleChange(ffField)}
                onBlur={ffOnHandleBlur(ffField)}
                secureTextEntry={ffSecureTextEntry}
                autoCapitalize={ffAutoCapitalize || "none"} // "words"
            />

            {ffTouched[ffField] && ffErrors[ffField] ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{ffErrors[ffField]}</Text>
                </View>
            ) : null}
        </View>
    );
}