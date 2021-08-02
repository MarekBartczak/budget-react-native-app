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

const StackExpenseNavigator = (props) => {
  const filter = (title, screenName) => {
    return {
      title: title,
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
          <MaterialCommunityIcons
            name="menu"
            size={34}
            color={Colors.primary}
          />
        </TouchableOpacity>
      ),
    };
  };
  const stackScreen = (name, component, option) => {
    return <Stack.Screen name={name} component={component} options={option} />;
  };
  return (
    <Stack.Navigator
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
      {stackScreen("Date", DateScreen, ({ navigation }) =>
        filter("Data", "Date")
      )}
      {stackScreen("Place", PlaceScreen, ({ navigation }) =>
        filter("Miejsce", "Place")
      )}
      {stackScreen("Category", CategoryScreen, ({ navigation }) =>
        filter("Kategoria", "Category")
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
