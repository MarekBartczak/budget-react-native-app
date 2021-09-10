import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import SettingsScreen from "../screens/settings/SettingsScreen";
import Logout from "../components/auth/logout/Logout";

const Stack = createStackNavigator();

const StackSettingsNavigator = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const stackScreen = (name, component, option) => {
    return <Stack.Screen name={name} component={component} options={option} />;
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors[scheme].primarySecond,
        headerStyle: {
          backgroundColor: Colors[scheme].backGroundOne,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      {stackScreen("Ustawienia", SettingsScreen, ({ navigation }) => ({
        headerTitle: () => (
          <Text
            style={{
              fontFamily: "Kanit_600SemiBold",
              fontSize: 15,
              color: Colors[scheme].primarySecond,
            }}
          >
            USTAWIENIA
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
              color={Colors[scheme].primarySecond}
            />
          </TouchableOpacity>
        ),
        headerRight: () => <Logout />,
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

export default StackSettingsNavigator;
