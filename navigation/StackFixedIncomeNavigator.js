import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FixedIncomeScreen from "../screens/fixedIncome/FixedIncomeScreen";
import FixedIncomeDetails from "../components/fixedIncome/fixedIncomeDetails/FixedIncomeDetails";
import FixedIncomeList from "../components/fixedIncome/FixedIncomeList";
import Logout from "../components/auth/logout/Logout";

const Stack = createStackNavigator();

const StackFixedIncomeNavigator = (props) => {
  const stackScreen = (name, component, option) => {
    return <Stack.Screen name={name} component={component} options={option} />;
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.primary,
        headerStyle: {
          backgroundColor: Colors.defaultThemeLight.backGroundOne,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      {stackScreen("FixedIncome", FixedIncomeScreen, ({ navigation }) => ({
        headerTitle: "Stałe wpływy",
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
      }))}
      {stackScreen("FixedIncomeList", FixedIncomeList, ({ navigation }) => ({
        headerTitle: "Lista stałych wpływów",
      }))}
      {stackScreen(
        "FixedIncomeDetails",
        FixedIncomeDetails,
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

export default StackFixedIncomeNavigator;
