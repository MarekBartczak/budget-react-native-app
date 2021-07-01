import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { createStackNavigator } from "@react-navigation/stack";

import FixedExpenseScreen from "../screens/fixedExpense/FixedExpenseScreen";
import FixedExpensesList from "../components/fixedExpense/FixedExpensesList";
import FixedExpenseDetails from "../components/fixedExpense/fixedExpenseDetails/FixedExpenseDetails";

const Stack = createStackNavigator();

const StackFixedExpenseNavigator = (props) => {
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
              color={Colors.primary}
            />
          </TouchableOpacity>
        ),
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
