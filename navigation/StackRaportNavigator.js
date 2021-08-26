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
import HeaderScreenComponent from "../screens/HeaderScreen/HeaderScreenComponent";
import RaportScreen from "../screens/raport/RaportScreen";
import SendRaportScreen from "../screens/raport/SendRaportScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logout from "../components/auth/logout/Logout";

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
          backgroundColor: Colors.defaultThemeLight.backGroundOne,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      {stackScreen("Raport", RaportScreen, ({ navigation }) => ({
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

        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => navigation.navigate("SendRaport")}
          >
            <MaterialCommunityIcons
              name="email-send-outline"
              size={34}
              color={Colors.primary}
            />
          </TouchableOpacity>
        ),
      }))}
      {stackScreen("SendRaport", SendRaportScreen, {
        title: "Wyslij",
      })}
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
