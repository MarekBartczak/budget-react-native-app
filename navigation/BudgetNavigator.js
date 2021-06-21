import MainScreen from "../screens/MainScreen";
import DetailsScreen from "../screens/DetailsScreen";
import RaportScreen from "../screens/RaportScreen";
import DateScreen from "../screens/DateScreen";
import PlaceScreen from "../screens/PlaceScreen";
import CategoryScreen from "../screens/CategoryScreen";
import AddSingleItemScreen from "../screens/AddSingleItemScreen";
import FavoritePlaceScreen from "../screens/FavoritePlaceScreen";
import AddMultipleItemScreen from "../screens/AddMultiItemsSetDateAndPlaceScreen";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();

const stackScreen = (name, component, option) => {
  return <Stack.Screen name={name} component={component} options={option} />;
};

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
        {stackScreen("Home", MainScreen, { title: "Główna" })}
        {stackScreen("Details", DetailsScreen, { title: "Szczegóły" })}
        {stackScreen("Raport", RaportScreen, { title: "Raport" })}
        {stackScreen("Date", DateScreen, { title: "Data" })}
        {stackScreen("Place", PlaceScreen, { title: "Miejsce" })}
        {stackScreen("Category", CategoryScreen, { title: "Kategoria" })}
        {stackScreen(
          "AddSingleItem",
          AddSingleItemScreen,
          ({ navigation }) => ({
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
          })
        )}

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
    </NavigationContainer>
  );
};

export default BudgetNavigator;
