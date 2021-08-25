import MainScreen from "../screens/expense/MainScreen";
import DetailsScreen from "../screens/expense/DetailsScreen";
import DateScreen from "../screens/expense/DateScreen";
import PlaceScreen from "../screens/expense/PlaceScreen";
import CategoryScreen from "../screens/expense/CategoryScreen";
import FavoritePlaceScreen from "../screens/expense/FavoritePlaceScreen";
import AddMultipleItemScreen from "../screens/expense/AddMultiItemsSetDateAndPlaceScreen";
import AddItemToTheReceiptScreen from "../screens/expense/AddItemToTheReceiptScreen";
import EditCategories from "../screens/expense/EditCategories";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Logout from "../components/auth/logout/Logout";
import React from "react";
import { Feather } from "@expo/vector-icons";
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
      headerRight: () => <Logout />,
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
      {stackScreen("editCategories", EditCategories, {
        title: "Edycja Kategori",
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
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("editCategories")}
            >
              <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
          ),
        })
      )}
    </Stack.Navigator>
  );
};

export default StackExpenseNavigator;
