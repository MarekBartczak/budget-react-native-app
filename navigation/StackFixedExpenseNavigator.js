import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { createStackNavigator } from "@react-navigation/stack";

import FixedExpenseScreen from "../screens/fixedExpense/FixedExpenseScreen";
import FixedExpensesList from "../components/fixedExpense/FixedExpensesList";
import FixedExpenseDetails from "../components/fixedExpense/fixedExpenseDetails/FixedExpenseDetails";
import AddNewFixedExpenseScreen from "../screens/fixedExpense/AddNewFixedExpenseScreen";
import Logout from "../components/auth/logout/Logout";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const StackFixedExpenseNavigator = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const stackScreen = (name, component, option) => {
    return <Stack.Screen name={name} component={component} options={option} />;
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors[scheme].primarySecond,
        headerStyle: {
          backgroundColor: Colors[scheme].primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      {stackScreen("FixedExpense", FixedExpenseScreen, ({ navigation }) => ({
        headerTitle: "Stałe wydatki",
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
      }))}
      {stackScreen(
        "FixedExpensesList",
        FixedExpensesList,
        ({ navigation }) => ({
          headerTitle: "Lista stałych wydatków",
        })
      )}
      {stackScreen(
        "FixedExpenseDetails",
        FixedExpenseDetails,
        ({ navigation }) => ({
          headerTitle: "Szczegóły",
        })
      )}
      {stackScreen(
        "AddNewFixedExpenseScreen",
        AddNewFixedExpenseScreen,
        ({ navigation }) => ({
          headerTitle: "Dodaj nowy stały wydatek",
        })
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});

export default StackFixedExpenseNavigator;
