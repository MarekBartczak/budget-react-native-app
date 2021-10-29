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
import { dataLang, selectLang } from "../lang/lang";

const Stack = createStackNavigator();

const StackExpenseNavigator = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const lang = useSelector((state) => state.config.language);

  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };

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
          {translate("WYDATKI").toUpperCase()}
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
      {stackScreen("Details", DetailsScreen, { title: translate("Szczegóły") })}
      {stackScreen("Date", DateScreen, ({ navigation }) =>
        filter(translate("Data"), "Date")
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
            {translate("LISTA WYDATKÓW").toUpperCase()}
          </Text>
        ),
      }))}
      {stackScreen("Place", PlaceScreen, ({ navigation }) =>
        filter(translate("Miejsce"), "Place")
      )}
      {stackScreen("InputData", InputDataScreen, ({ navigation }) =>
        filter(translate("Wpisz dane"), "InputData")
      )}
      {stackScreen("Category", CategoryScreen, ({ navigation }) =>
        filter(translate("Kategoria"), "Category")
      )}

      {stackScreen("FavoritePlace", FavoritePlaceScreen, {
        title: translate("Ulubione"),
      })}
      {stackScreen("EditCategories", EditCategories, {
        title: translate("Edycja Kategorii"),
      })}
      {stackScreen(
        "AddMultipleItem",
        AddMultipleItemScreen,
        ({ navigation }) => ({
          headerTitle: translate("Cały paragon").toUpperCase(),
        })
      )}
      {stackScreen(
        "AddToReceipt",
        AddItemToTheReceiptScreen,
        ({ navigation }) => ({
          headerTitle: translate("Dodaj do paragonu"),
        })
      )}
    </Stack.Navigator>
  );
};

export default StackExpenseNavigator;
