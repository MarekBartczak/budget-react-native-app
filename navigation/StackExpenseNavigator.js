import MainScreen from "../screens/expense/MainScreen";
import DetailsScreen from "../screens/expense/DetailsScreen";
import DateScreen from "../screens/expense/DateScreen";
import PlaceScreen from "../screens/expense/PlaceScreen";
import CategoryScreen from "../screens/expense/CategoryScreen";
import FavoritePlaceScreen from "../screens/expense/FavoritePlaceScreen";
import AddMultipleItemScreen from "../screens/expense/AddMultiItemsSetDateAndPlaceScreen";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";

const Stack = createStackNavigator();

const filter = (title) => {
  return {
    title: title,
    headerRight: () => (
      <TouchableOpacity
        style={{
          padding: 0,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 20,
        }}
        onPress={() => {}}
      >
        <MaterialIcons name="filter-list" size={34} color={Colors.primary} />
      </TouchableOpacity>
    ),
  };
};

const toggleDrawer = (navigation) => {
  return {
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
        <MaterialCommunityIcons name="menu" size={34} color={Colors.primary} />
      </TouchableOpacity>
    ),
  };
};

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
      {stackScreen("Home", MainScreen, ({ navigation }) =>
        toggleDrawer(navigation)
      )}
      {stackScreen("Details", DetailsScreen, { title: "Szczegóły" })}
      {stackScreen("Date", DateScreen, ({ navigation }) => filter("Data"))}
      {stackScreen("Place", PlaceScreen, ({ navigation }) => filter("Miejsce"))}
      {stackScreen("Category", CategoryScreen, ({ navigation }) =>
        filter("Kategoria")
      )}

      {stackScreen("FavoritePlace", FavoritePlaceScreen, {
        title: "Ulubione",
      })}
      {stackScreen(
        "AddMultipleItem",
        AddMultipleItemScreen,
        ({ navigation }) => ({
          headerTitle: "Cały paragon",
        })
      )}
    </Stack.Navigator>
  );
};

export default StackExpenseNavigator;
