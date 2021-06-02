import "react-native-gesture-handler";
import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./screens/MainScreen";
import DetailsScreen from "./screens/DetailsScreen";
import RaportScreen from "./screens/RaportScreen";
import DateScreen from "./screens/DateScreen";
import PlaceScreen from "./screens/PlaceScreen";
import CategoryScreen from "./screens/CategoryScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Raport" component={RaportScreen} />
        <Stack.Screen name="Date" component={DateScreen} />
        <Stack.Screen name="Place" component={PlaceScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
