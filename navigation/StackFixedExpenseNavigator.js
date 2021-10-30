import { StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
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
import { dataLang, selectLang } from "../lang/lang";

const Stack = createStackNavigator();

const StackFixedExpenseNavigator = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const lang = useSelector((state) => state.config.language);

  const translate = (word) => {
    return selectLang(lang, dataLang, word);
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
      {stackScreen("FixedExpense", FixedExpenseScreen, ({ navigation }) => ({
        headerTitle: () => (
          <Text
            style={{
              fontFamily: "Kanit_600SemiBold",
              fontSize: 15,
              color: Colors[scheme].headerTintColor,
            }}
          >
            {translate("STAŁE WYDATKI").toUpperCase()}
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
      }))}
      {stackScreen(
        "FixedExpensesList",
        FixedExpensesList,
        ({ navigation }) => ({
          headerTitle: translate("Lista stałych wydatków"),
        })
      )}
      {stackScreen(
        "FixedExpenseDetails",
        FixedExpenseDetails,
        ({ navigation }) => ({
          headerTitle: translate("Szczegóły"),
        })
      )}
      {stackScreen(
        "AddNewFixedExpenseScreen",
        AddNewFixedExpenseScreen,
        ({ navigation }) => ({
          headerTitle: translate("Dodaj nowy stały wydatek"),
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
