import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image, ScrollView, StyleSheet, Text, View
} from "react-native";
import MainHeader from "../MainHeader";
import PokemonStatus from "../PokemonStatus";
import PokemonType from "../PokemonType";
import { BackgroundColor } from "../constants";

export default function PokemonDetail({ navigation, route }) {
    const [staStaProgress, setStaStaProgress] = useState(0);
    const [staAtkProgress, setStaAtkProgress] = useState(0);
    const [staDefProgress, setStaDefProgress] = useState(0);
    const [staCpProgress, setStaCpProgress] = useState(0);

    const maxSTA = 400;
    const maxATK = 400;
    const maxDEF = 400;
    const maxCP = 4000;

    const { pokemonFromPL = {} } = route.params;
    const { sta, atk, def, cp, uri, title_1, field_pokemon_generation, field_pokemon_type, catch_rate, field_flee_rate } = pokemonFromPL
    const pokemonTypes = field_pokemon_type.split(", ");
    const PokemonTypeElement = pokemonTypes.map((type_item, index_item) => {
        return (
            <View style={styles.pokemonType} key={index_item}>
                <PokemonType props_type={type_item} />
                <Text>{type_item.toUpperCase()}</Text>
            </View>
        );
    });

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setStaStaProgress(+sta / maxSTA);
            setStaAtkProgress(+atk / maxATK);
            setStaDefProgress(+def / maxDEF);
            setStaCpProgress(+cp / maxCP);
        }, 400);

        // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    return (
        <View style={styles.container}>
            <MainHeader
                title="PokemonDetail (DoTQ)"
                navigation={navigation} />

            <ScrollView style={{ flex: 1 }}>
                <View style={styles.content}>
                    <Image
                        style={styles.avatar}
                        placeholderStyle={{ backgroundColor: "transparent" }}
                        PlaceholderContent={<ActivityIndicator />}
                        source={{ uri: uri }}
                    />

                    <Text style={styles.pokemonName}>{title_1}</Text>

                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        {PokemonTypeElement}
                    </View>

                    <View>
                        <Text style={styles.description}>
                            {title_1} is a pokemonFromPL {field_pokemon_generation}.
                            {"\n"}
                            Capture Rate: {catch_rate}, Flee Rate:{" "}
                            {field_flee_rate}
                        </Text>
                    </View>

                    <View>
                        <PokemonStatus
                            props_title="STA"
                            props_value={sta}
                            props_progress={staStaProgress}
                        />

                        <PokemonStatus
                            props_title="ATK"
                            props_value={atk}
                            props_progress={staAtkProgress}
                        />

                        <PokemonStatus
                            props_title="DEF"
                            props_value={def}
                            props_progress={staDefProgress}
                        />

                        <PokemonStatus
                            props_title="CP"
                            props_value={cp}
                            props_progress={staCpProgress}
                        />
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
        marginTop: 150,
        marginBottom: 30,
    },
    avatar: {
        position: "absolute",
        width: 200,
        height: 200,
        alignSelf: "center",
        top: -130,
        resizeMode: "contain",
    },
    pokemonName: {
        marginTop: 80,
        alignSelf: "center",
        fontSize: 30,
        color: "#4f4f4f",
    },
    description: {
        color: "#4f4f4f",
        textAlign: "center",
        lineHeight: 22,
        marginTop: 15,
        marginBottom: 35,
    },
    pokemonType: {
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
});