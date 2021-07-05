import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { HAND_P, HAND_R, HAND_S } from "./constants";

export default function Actions({ props_play, props_canPlay }) {
    return (
        <View style={styles.actions}>
            <TouchableOpacity
                disabled={!props_canPlay}
                style={styles.actionButton}
                onPress={() => props_play(1)}
            >
                <FontAwesome5 name={HAND_R} size={32} color="#6a5300" />
            </TouchableOpacity>

            <TouchableOpacity
                disabled={!props_canPlay}
                style={styles.actionButton}
                onPress={() => props_play(2)}
            >
                <FontAwesome5 name={HAND_P} size={32} color="#6a5300" />
            </TouchableOpacity>

            <TouchableOpacity
                disabled={!props_canPlay}
                style={styles.actionButton}
                onPress={() => props_play(3)}
            >
                <FontAwesome5
                    name={HAND_S}
                    size={32}
                    color="#6a5300"
                    style={{ transform: [{ rotate: "67deg" }] }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    actions: {
        height: 100,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    actionButton: {
        width: 64,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9d835",
        borderRadius: 32,
    },
})