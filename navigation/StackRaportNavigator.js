import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderScreenComponent from "../screens/HeaderScreen/HeaderScreenComponent";
import RaportScreen from "../screens/raport/RaportScreen";
const Stack = createStackNavigator();

const StackRaportNavigator = (props) => {
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
      {stackScreen("Raport", RaportScreen, ({ navigation }) =>
        HeaderScreenComponent({ navigation })
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

export default StackRaportNavigator;
