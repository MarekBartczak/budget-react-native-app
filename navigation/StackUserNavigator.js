import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import UserScreen from "../screens/user/UserScreen";
import Colors from "../constants/Colors";
import Logout from "../components/auth/logout/Logout";
import { TouchableOpacity, useColorScheme } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const StackUserNavigator = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const filter = (title, screenName) => {
    return {
      title: title,
    };
  };

  const toggleDrawer = (navigation) => {
    return {
      headerTitle: "Dane konta",
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
      headerRight: () => <Logout />,
    };
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
      {stackScreen("User", UserScreen, ({ navigation }) =>
        toggleDrawer(navigation)
      )}
    </Stack.Navigator>
  );
};

export default StackUserNavigator;

const styles = StyleSheet.create({});
