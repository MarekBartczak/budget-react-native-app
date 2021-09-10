import MainScreen from "../screens/expense/MainScreen";
import DetailsScreen from "../screens/expense/DetailsScreen";
import DateScreen from "../screens/expense/DateScreen";
import PlaceScreen from "../screens/expense/PlaceScreen";
import CategoryScreen from "../screens/expense/CategoryScreen";
import FavoritePlaceScreen from "../screens/expense/FavoritePlaceScreen";
import AddMultipleItemScreen from "../screens/expense/AddMultiItemsSetDateAndPlaceScreen";
import AddItemToTheReceiptScreen from "../screens/expense/AddItemToTheReceiptScreen";
import EditCategories from "../screens/expense/EditCategoriesScreen";
import InputDataScreen from "../screens/expense/InputDataScreen";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Logout from "../components/auth/logout/Logout";
import React from "react";
import { useSelector } from "react-redux";
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
            color: Colors[scheme].primarySecond,
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
            color={Colors[scheme].primarySecond}
          />
        </TouchableOpacity>
      ),
      headerRight: () => <Logout />,
    };
  };

  const stackScreen = (name, component, option) => {
    return <Stack.Screen name={name} component={component} options={option} />;
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors[scheme].primarySecond,

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
