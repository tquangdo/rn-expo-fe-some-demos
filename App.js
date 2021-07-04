import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { Image, View } from "react-native";
import moveTabIcon from "./assets/pokedex/move-active.png";
import pokemonTabIcon from "./assets/pokedex/pokemon-active.png";
import MoveDetail from "./components/pokedex/screens/MoveDetail";
import MoveList from "./components/pokedex/screens/MoveList";
// import PokemonDetail from "./components/pokedex/screens/PokemonDetail";
// import PokemonList from "./components/pokedex/screens/PokemonList";

// https://reactnavigation.org/docs/stack-navigator/
const PokemonStack = createStackNavigator();
const MoveStack = createStackNavigator();
const stackScreenOptions = {
  headerShown: false,
  gestureEnabled: true,
};

function PokemonStackScreen() {
  return (
    <Text>PokemonStackScreen</Text>
    // <PokemonStack.Navigator screenOptions={stackScreenOptions}>
    //   <PokemonStack.Screen name="PokemonList" component={PokemonList} />
    //   <PokemonStack.Screen name="PokemonDetail" component={PokemonDetail} />
    // </PokemonStack.Navigator>
  );
}

function MoveStackScreen() {
  return (
    <MoveStack.Navigator screenOptions={stackScreenOptions}>
      <MoveStack.Screen name="MoveList" component={MoveList} />
      <MoveStack.Screen name="MoveDetail" component={MoveDetail} />
    </MoveStack.Navigator>
  );
}

// https://reactnavigation.org/docs/bottom-tab-navigator/
const Tab = createBottomTabNavigator();
const ActiveColor = "#000000";
const InActiveColor = "#00000077";
const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={route.name === "Pokemons" ? pokemonTabIcon : moveTabIcon}
          style={{
            opacity: color == ActiveColor ? 1 : 0.5,
            width: size,
            height: size,
          }}
        />
      </View>
    );
  },
});
const tabBarOptions = {
  activeTintColor: ActiveColor,
  inactiveTintColor: InActiveColor,
};

export default function Pokedex() {
  return (
    <>
      <StatusBar style="light" />

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={tabScreenOptions}
          tabBarOptions={tabBarOptions}
        >
          <Tab.Screen name="Pokemons" component={PokemonStackScreen} />
          <Tab.Screen name="Moves" component={MoveStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}