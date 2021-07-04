import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements";
import MainHeader from "../MainHeader";
import { BackgroundColor, PokemonTypeIcon } from "../constants";

export default function MoveDetail({ navigation, route }) {
    const { moveFromML = {} } = route.params;
    const { title, move_type, move_category, dodge_window, damage_window, power, cooldown, energy_gain } = moveFromML

    return (
        <View style={styles.container}>
            <MainHeader
                title="MoveDetail (DoTQ)"
                navigation={navigation} />

            <ScrollView style={{ flex: 1 }}>
                <View style={styles.content}>
                    <Text style={styles.moveName}>{title}</Text>

                    <View style={styles.moveType}>
                        <Image
                            source={
                                PokemonTypeIcon[move_type.toLowerCase()] ||
                                PokemonTypeIcon["default"]
                            }
                        />
                        <Text>{move_type.toUpperCase()}</Text>
                    </View>

                    <View>
                        <Text style={styles.description}>
                            This moveFromML is belong to {move_category}.{"\n"}
                            Dodge window is {dodge_window} and {"\n"}
                            Damage window is {damage_window}.
                        </Text>
                    </View>

                    <View style={styles.hr}></View>

                    <View style={styles.moveCompare}>
                        <View style={styles.movePart}>
                            <Text style={styles.movePartTitle}>Power</Text>
                            <Text>{power}</Text>
                        </View>

                        <View style={styles.movePart}>
                            <Text style={styles.movePartTitle}>Cooldown</Text>
                            <Text>{cooldown}</Text>
                        </View>

                        <View style={[styles.movePart, styles.borderRightNone]}>
                            <Text style={styles.movePartTitle}>Energy</Text>
                            <Text>{energy_gain}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BackgroundColor,
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 20,
        minHeight: 500,
        marginVertical: 30,
    },
    moveName: {
        marginTop: 25,
        alignSelf: "center",
        fontSize: 40,
        color: "#4f4f4f",
    },
    moveType: {
        alignItems: "center",
    },
    description: {
        color: "#4f4f4f",
        textAlign: "center",
        lineHeight: 22,
        marginTop: 15,
        marginBottom: 35,
    },
    moveCompare: {
        flexDirection: "row",
    },
    movePart: {
        flex: 1,
        alignItems: "center",
        borderRightColor: "#f0f0f0",
        borderRightWidth: 1,
    },
    borderRightNone: {
        borderRightWidth: 0,
    },
    movePartTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        color: "#1a87d9",
        fontWeight: "bold",
    },
    hr: {
        height: 1,
        backgroundColor: "#f0f0f0",
    },
});