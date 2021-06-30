import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import IncomeScreen from "../screens/income/IncomeScreen";
import BudgetNavigator from "./StackNavigator";
import FixedExpenseScreen from "../screens/fixedExpense/FixedExpenseScreen";
import RaportScreen from "../screens/raport/RaportScreen";
import FixedIncomeScreen from "../screens/fixedIncome/FixedIncomeScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import Colors from "../constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerType="back"
        drawerStyle={{ backgroundColor: Colors.banner }}
        drawerContentOptions={{
          activeTintColor: Colors.primary,
          labelStyle: { color: Colors.primary, fontSize: 15 },
        }}
      >
        <Drawer.Screen
          name="Wydatki"
          component={BudgetNavigator}
          options={{
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="cash-minus"
                size={34}
                color={Colors.primary}
              />
            ),
            drawerLabel: "Wydatki",
          }}
        />
        <Drawer.Screen
          name="Stałe wydatki"
          component={FixedExpenseScreen}
          options={{
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="calendar-arrow-left"
                size={34}
                color={Colors.primary}
              />
            ),
            drawerLabel: "Stałe wydatki",
          }}
        />
        <Drawer.Screen
          name="Wpływy"
          component={IncomeScreen}
          options={{
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="cash-plus"
                size={34}
                color={Colors.primary}
              />
            ),
            drawerLabel: "Wpływy",
          }}
        />
        <Drawer.Screen
          name="Stałe wpływy"
          component={FixedIncomeScreen}
          options={{
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="calendar-arrow-right"
                size={34}
                color={Colors.primary}
              />
            ),
            drawerLabel: "Stałe wpływy",
          }}
        />
        <Drawer.Screen
          name="Raport"
          component={RaportScreen}
          options={{
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="file-document"
                size={34}
                color={Colors.primary}
              />
            ),
            drawerLabel: "Raport",
          }}
        />
        <Drawer.Screen
          name="Ustawienia"
          component={SettingsScreen}
          options={{
            drawerIcon: () => (
              <Ionicons name="ios-settings" size={34} color={Colors.primary} />
            ),
            drawerLabel: "Ustawienia",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
