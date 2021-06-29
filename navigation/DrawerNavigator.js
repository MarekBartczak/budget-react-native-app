import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import MainScreen from "../screens/MainScreen";
import BudgetNavigator from "../navigation/BudgetNavigator";
import FixedExpenseScreen from "../screens/fixedExpense/FixedExpenseScreen";
import RaportScreen from "../screens/raport/RaportScreen";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Wydatki" component={BudgetNavigator} />
        <Drawer.Screen name="Wydatki Stałe" component={FixedExpenseScreen} />
        <Drawer.Screen name="Raport" component={RaportScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
