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
import ViewSettingsScreen from "../screens/settings/ViewSettingsScreen";
import AccountSettingsScreen from "../screens/settings/AccountSettingsScreen";
import { dataLang, selectLang } from "../lang/lang";
import SettingsScreen from "../screens/settings/SettingsScreen";
import Logout from "../components/auth/logout/Logout";
import LangScreen from "../components/settings/lang/LangScreeng";
const Stack = createStackNavigator();

const StackSettingsNavigator = (props) => {
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
      {stackScreen(
        translate("Ustawienia"),
        SettingsScreen,
        ({ navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Kanit_600SemiBold",
                fontSize: 15,
                color: Colors[scheme].headerTintColor,
              }}
            >
              {translate("USTAWIENIA").toUpperCase()}
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
        })
      )}

      {stackScreen(
        "AccountSettings",
        AccountSettingsScreen,
        ({ navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Kanit_600SemiBold",
                fontSize: 15,
                color: Colors[scheme].headerTintColor,
              }}
            >
              {translate("USTAWIENIA KONTA").toUpperCase()}
            </Text>
          ),
        })
      )}

      {stackScreen("ViewSettings", ViewSettingsScreen, ({ navigation }) => ({
        headerTitle: () => (
          <Text
            style={{
              fontFamily: "Kanit_600SemiBold",
              fontSize: 15,
              color: Colors[scheme].headerTintColor,
            }}
          >
            {translate("USTAWIENIA WIDOKU").toUpperCase()}
          </Text>
        ),
      }))}
      {stackScreen("LangSettings", LangScreen, ({ navigation }) => ({
        headerTitle: () => (
          <Text
            style={{
              fontFamily: "Kanit_600SemiBold",
              fontSize: 15,
              color: Colors[scheme].headerTintColor,
            }}
          >
            {translate("USTAWIENIA JĘZYKA").toUpperCase()}
          </Text>
        ),
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
