import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import SettingsElement from "./SettingsElement";
import fontSclae from "../../constants/FontScale";
import { dataLang, selectLang } from "../../lang/lang";
const Settings = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
  return (
    <View style={styles.container}>
      <SettingsElement
        title={translate("Konto")}
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
        title={translate("Widok")}
        icon={
          <MaterialCommunityIcons
            name="view-dashboard"
            size={24}
            color={Colors[scheme].headerTintColor}
          />
        }
        target={"ViewSettings"}
      />
      <SettingsElement
        title={translate("Język")}
        icon={
          <Fontisto
            name="flag"
            size={24}
            color={Colors[scheme].headerTintColor}
          />
        }
        target={"LangSettings"}
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
