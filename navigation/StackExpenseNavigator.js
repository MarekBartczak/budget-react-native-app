import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Logout from "../components/auth/logout/Logout";
import Colors from "../constants/Colors";
import AddItemToTheReceiptScreen from "../screens/expense/AddItemToTheReceiptScreen";
import AddMultipleItemScreen from "../screens/expense/AddMultiItemsSetDateAndPlaceScreen";
import CategoryScreen from "../screens/expense/CategoryScreen";
import DateScreen from "../screens/expense/DateScreen";
import DetailsScreen from "../screens/expense/DetailsScreen";
import EditCategories from "../screens/expense/EditCategoriesScreen";
import ExpenseListScreen from "../screens/expense/ExpenseListScreen";
import FavoritePlaceScreen from "../screens/expense/FavoritePlaceScreen";
import InputDataScreen from "../screens/expense/InputDataScreen";
import MainScreen from "../screens/expense/MainScreen";
import PlaceScreen from "../screens/expense/PlaceScreen";

const Stack = createStackNavigator();

const StackExpenseNavigator = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const filter = (title, screenName) => {
    return {
      title: title,
    };
  };

  const toggleDrawer = (navigation) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontFamily: "Kanit_600SemiBold",
            fontSize: 15,
            color: Colors[scheme].headerTintColor,
          }}
        >
          WYDATKI
        </Text>
      ),

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
            color={Colors[scheme].headerTintColor}
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
        headerTintColor: Colors[scheme].headerTintColor,

        headerStyle: {
          backgroundColor: Colors[scheme].backGroundOne,
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
      {stackScreen("ExpenseList", ExpenseListScreen, ({ navigation }) => ({
        headerTitle: () => (
          <Text
            style={{
              fontFamily: "Kanit_600SemiBold",
              fontSize: 15,
              color: Colors[scheme].headerTintColor,
            }}
          >
            LISTA WYDATKÓW
          </Text>
        ),
      }))}
      {stackScreen("Place", PlaceScreen, ({ navigation }) =>
        filter("Miejsce", "Place")
      )}
      {stackScreen("InputData", InputDataScreen, ({ navigation }) =>
        filter("Wpisz dane", "InputData")
      )}
      {stackScreen("Category", CategoryScreen, ({ navigation }) =>
        filter("Kategoria", "Category")
      )}

      {stackScreen("FavoritePlace", FavoritePlaceScreen, {
        title: "Ulubione",
      })}
      {stackScreen("EditCategories", EditCategories, {
        title: "Edycja Kategorii",
      })}
      {stackScreen(
        "AddMultipleItem",
        AddMultipleItemScreen,
        ({ navigation }) => ({
          headerTitle: "Cały paragon",
        })
      )}
      {stackScreen(
        "AddToReceipt",
        AddItemToTheReceiptScreen,
        ({ navigation }) => ({
          headerTitle: "Dodaj do paragonu",
        })
      )}
    </Stack.Navigator>
  );
};

export default StackExpenseNavigator;
