import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import SettingsElement from "./SettingsElement";
import fontSclae from "../../constants/FontScale";

const Settings = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  return (
    <View style={styles.container}>
      <SettingsElement
        title={"Konto"}
        icon={
          <MaterialCommunityIcons
            name="account-cog"
            size={24}
            color={Colors[scheme].headerTintColor}
          />
        }
        target={"AccountSettings"}
      />
      <SettingsElement
        title={"Widok"}
        icon={
          <MaterialCommunityIcons
            name="view-dashboard"
            size={24}
            color={Colors[scheme].headerTintColor}
          />
        }
        target={"ViewSettings"}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
});
