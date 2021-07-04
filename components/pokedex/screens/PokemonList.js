import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Avatar, ListItem, SearchBar } from "react-native-elements";

import MainHeader from "../MainHeader";
import PokemonType from "../PokemonType";
import pokeballIcon from "../../../assets/pokedex/pokeball.png";
import { FullPokemonsAPI } from "../constants";

export default function PokemonList({ navigation }) {
    const [staDisplayPokemons, setStaDisplayPokemons] = useState([]);
    const [staPokemons, setStaPokemons] = useState([]);
    const [staIsLoading, setStaIsLoading] = useState(true);
    const [staKeyword, setStaKeyword] = useState("");

    const onRenderItem = ({ item, index }) => {
        const pokemonTypes = item.field_pokemon_type.split(", ");
        const PokemonTypeElement = pokemonTypes.map((type_item, index) => {
            return (
                <View key={index}>
                    <PokemonType props_type={type_item} />
                </View>
            );
        });

        return (
            <ListItem
                bottomDivider={true}
                onPress={() => {
                    navigation.navigate("PokemonDetail", {
                        pokemonFromPL: staDisplayPokemons[index],
                    });
                }}
            >
                <Avatar
                    source={item.uri ? { uri: item.uri } : pokeballIcon}
                    size="medium"
                />

                <ListItem.Content>
                    <ListItem.Title>{item.title_1}</ListItem.Title>

                    <ListItem.Subtitle style={styles.listItemSubtitle}>
                        #
                        {item.number.length <= 3
                            ? ("00" + item.number).slice(-3)
                            : item.number}
                    </ListItem.Subtitle>
                </ListItem.Content>

                <View style={{ flexDirection: "row" }}>{PokemonTypeElement}</View>
            </ListItem>
        );
    };

    const onSearchPokemon = (arg_keyword) => {
        setStaKeyword(arg_keyword);

        if (arg_keyword == "") {
            setStaDisplayPokemons(staPokemons);
        } else {
            const filteredPokemons = staPokemons.filter((pokemon) => {
                return pokemon.title_1.toLowerCase().includes(arg_keyword.toLowerCase());
            });
            setStaDisplayPokemons(filteredPokemons);
        }
    };

    useEffect(() => {
        const onFetchData = async (fullpokemonsapi_url) => {
            try {
                const response = await fetch(fullpokemonsapi_url);
                const responseJson = await response.json();

                setStaPokemons(responseJson);
                setStaDisplayPokemons(responseJson);
                setStaKeyword("");
                setStaIsLoading(false);
            } catch (error) {
                Alert.alert("Cannot connect to Server! Error: " + error);
            }
        };

        onFetchData(FullPokemonsAPI);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MainHeader
                title="Pokemons (Made by DoTQ)"
                isMain={true}
                navigation={navigation}
            />

            <SearchBar
                placeholder="Find Pokemon by name ..."
                inputContainerStyle={{ backgroundColor: "#e9e9e9" }}
                containerStyle={{ backgroundColor: "transparent" }}
                lightTheme={true}
                round={true}
                value={staKeyword}
                onChangeText={onSearchPokemon}
            />

            {!staIsLoading ? (
                <FlatList
                    data={staDisplayPokemons}
                    renderItem={onRenderItem}
                    keyExtractor={(item) => item.nid}
                    initialNumToRender={10}
                />
            ) : (
                <ActivityIndicator animating size="large" style={{ marginTop: 20 }} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    listItemSubtitle: { marginTop: 10, color: "#939393" },
});