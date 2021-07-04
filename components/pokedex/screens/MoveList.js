import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    Alert,
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { uniqBy } from "lodash";
import MainHeader from "../MainHeader";
import { FullMovesAPI, PokemonTypeIcon } from "../constants";

export default function MoveList({ navigation }) {
    const [staDisplayMoves, setStaDisplayMoves] = useState([]);
    const [staMoves, setStaMoves] = useState([]);
    const [staIsLoading, setStaIsLoading] = useState(true);
    const [staKeyword, setStaKeyword] = useState("");

    const onRenderItem = ({ item, index }) => {
        return (
            <ListItem
                containerStyle={styles.listItem}
                onPress={() => {
                    navigation.navigate("MoveDetail", {
                        moveFromML: staDisplayMoves[index],
                    });
                }}
            >
                <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>

                <View style={{ flexDirection: "row" }}>
                    <Image source={PokemonTypeIcon[item.move_type.toLowerCase()]} />
                </View>
            </ListItem>
        );
    };

    const onSearchMove = (arg_keyword) => {
        setStaKeyword(arg_keyword);

        if (arg_keyword == "") {
            setStaDisplayMoves(staMoves);
        } else {
            const filteredMoves = staMoves.filter((move_item) => {
                return move_item.title.toLowerCase().includes(arg_keyword.toLowerCase());
            });
            setStaDisplayMoves(filteredMoves);
        }
    };

    useEffect(() => {
        const onFetchData = async (fullmovesapi_url) => {
            try {
                const response = await fetch(fullmovesapi_url);
                const responseJson = await response.json();
                const removeDuplicated = uniqBy(responseJson, "nid");

                setStaMoves(removeDuplicated);
                setStaDisplayMoves(removeDuplicated);
                setStaKeyword("");
                setStaIsLoading(false);
            } catch (error) {
                Alert.alert("Cannot connect to Server! Error: " + error);
            }
        };

        onFetchData(FullMovesAPI);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MainHeader title="Moves (Made by DoTQ)" isMain={true} navigation={navigation} />

            <SearchBar
                placeholder="Find Move by name ..."
                inputContainerStyle={{ backgroundColor: "#e9e9e9" }}
                containerStyle={{ backgroundColor: "transparent" }}
                lightTheme={true}
                round={true}
                value={staKeyword}
                onChangeText={onSearchMove}
            />

            {!staIsLoading ? (
                <FlatList
                    data={staDisplayMoves}
                    renderItem={onRenderItem}
                    keyExtractor={(item) => item.nid}
                    initialNumToRender={10}
                />
            ) : (
                <ActivityIndicator animating size="large" />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
});