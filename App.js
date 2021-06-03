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
import Colors from "./constants/Colors";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTintColor: Colors.primary }}
      >
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{ title: "Główna" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Szczegóły" }}
        />
        <Stack.Screen
          name="Raport"
          component={RaportScreen}
          options={{ title: "Raport" }}
        />
        <Stack.Screen
          name="Date"
          component={DateScreen}
          options={{ title: "Data" }}
        />
        <Stack.Screen
          name="Place"
          component={PlaceScreen}
          options={{ title: "Miejsce" }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{ title: "Kategoria" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
