import MainScreen from "../screens/expense/MainScreen";
import DetailsScreen from "../screens/expense/DetailsScreen";
import DateScreen from "../screens/expense/DateScreen";
import PlaceScreen from "../screens/expense/PlaceScreen";
import CategoryScreen from "../screens/expense/CategoryScreen";
import AddSingleItemScreen from "../screens/expense/AddSingleItemScreen";
import FavoritePlaceScreen from "../screens/expense/FavoritePlaceScreen";
import AddMultipleItemScreen from "../screens/expense/AddMultiItemsSetDateAndPlaceScreen";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";

const Stack = createStackNavigator();

const StackExpenseNavigator = (props) => {
  const stackScreen = (name, component, option) => {
    return <Stack.Screen name={name} component={component} options={option} />;
  };
  return (
    <Stack.Navigator
      // initialRouteName="Home"
      screenOptions={{
        headerTintColor: Colors.primary,
        headerStyle: {
          backgroundColor: Colors.gradientBackground.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      {stackScreen("Home", MainScreen, ({ navigation }) => ({
        headerTitle: "Wydatki",
        headerLeft: () => (
          <TouchableOpacity
            style={{
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 20,
            }}
            onPress={() => navigation.toggleDrawer()}
          >
            <MaterialCommunityIcons
              name="menu"
              size={34}
              color={Colors.primary}
            />
          </TouchableOpacity>
        ),
      }))}
      {stackScreen("Details", DetailsScreen, { title: "Szczegóły" })}
      {stackScreen("Date", DateScreen, { title: "Data" })}
      {stackScreen("Place", PlaceScreen, { title: "Miejsce" })}
      {stackScreen("Category", CategoryScreen, { title: "Kategoria" })}

      {stackScreen("AddSingleItem", AddSingleItemScreen, ({ navigation }) => ({
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
      }))}

      {stackScreen("FavoritePlace", FavoritePlaceScreen, {
        title: "Ulubione",
      })}
      {stackScreen(
        "AddMultipleItem",
        AddMultipleItemScreen,
        ({ navigation }) => ({
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
        })
      )}
    </Stack.Navigator>
  );
};

export default StackExpenseNavigator;