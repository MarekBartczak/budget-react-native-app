import { StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IncomeScreen from "../screens/income/IncomeScreen";
import IncomeDetails from "../components/income/incomeDetails/IncomeDetails";
import IncomeList from "../components/income/IncomeList";
import Logout from "../components/auth/logout/Logout";
import { useSelector } from "react-redux";
import { dataLang, selectLang } from "../lang/lang";

const Stack = createStackNavigator();

const StackIncomeNavigator = (props) => {
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
      {stackScreen("Income", IncomeScreen, ({ navigation }) => ({
        headerTitle: () => (
          <Text
            style={{
              fontFamily: "Kanit_600SemiBold",
              fontSize: 15,
              color: Colors[scheme].headerTintColor,
            }}
          >
            {translate("WPŁYWY").toUpperCase()}
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
      {stackScreen("IncomeList", IncomeList, ({ navigation }) => ({
        headerTitle: translate("Lista wpływów"),
      }))}
      {stackScreen("IncomeDetails", IncomeDetails, ({ navigation }) => ({
        headerTitle: translate("Szczegóły"),
      }))}
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

export default StackIncomeNavigator;
