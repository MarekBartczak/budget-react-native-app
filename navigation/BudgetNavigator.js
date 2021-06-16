import MainScreen from "../screens/MainScreen";
import DetailsScreen from "../screens/DetailsScreen";
import RaportScreen from "../screens/RaportScreen";
import DateScreen from "../screens/DateScreen";
import PlaceScreen from "../screens/PlaceScreen";
import CategoryScreen from "../screens/CategoryScreen";
import Colors from "../constants/Colors";
import AddSingleItemScreen from "../screens/AddSingleItemScreen";
import FavoritePlaceScreen from "../screens/FavoritePlaceScreen";
import AddMultipleItemScreen from "../screens/AddMultiItemsSetDateAndPlaceScreen";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const BudgetNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: Colors.primary,
          headerStyle: {
            backgroundColor: Colors.default,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
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
        <Stack.Screen
          name="AddSingleItem"
          component={AddSingleItemScreen}
          options={({ navigation }) => ({
            headerTitle: "Pojedynczy element",
            headerRight: () => (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,
                }}
                onPress={() => navigation.navigate("AddMultipleItem")}
              >
                <MaterialCommunityIcons
                  name="text-box-multiple-outline"
                  size={24}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="FavoritePlace"
          component={FavoritePlaceScreen}
          options={{ title: "Ulubione" }}
        />
        <Stack.Screen
          name="AddMultipleItem"
          component={AddMultipleItemScreen}
          options={({ navigation }) => ({
            headerTitle: "Cały paragon",
            headerRight: () => (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,
                }}
                onPress={() => navigation.navigate("AddSingleItem")}
              >
                <MaterialCommunityIcons
                  name="numeric-1-box-multiple-outline"
                  size={24}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          })}
          // options={{ title: "Cały paragon" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BudgetNavigator;
