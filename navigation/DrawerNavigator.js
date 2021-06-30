import React from "react";
import Colors from "../constants/Colors";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import StackExpenseNavigator from "./StackExpenseNavigator";
import StackIncomeNavigator from "./StackIncomeNavigator";
import StackFixedExpenseNavigator from "./StackFixedExpenseNavigator";
import StackRaportNavigator from "./StackRaportNavigator";
import StackFixedIncomeNavigator from "./StackFixedIncomeNavigator";
import StackSettingsNavigator from "./StackSettingsNavigator";

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
          component={StackExpenseNavigator}
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
          component={StackFixedExpenseNavigator}
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
          component={StackIncomeNavigator}
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
          component={StackFixedIncomeNavigator}
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
          component={StackRaportNavigator}
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
          component={StackSettingsNavigator}
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
