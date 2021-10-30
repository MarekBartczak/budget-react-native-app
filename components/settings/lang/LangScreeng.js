import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import fontScale from "../../../constants/FontScale";
import { dataLang, selectLang } from "../../../lang/lang";
import * as configActions from "../../../store/actions/config";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import updateConfigInClound from "../../../functions/cloud/config/updateConfigInClound";
const LangScreeng = (props) => {
  const userId = useSelector((state) => state.auth.userID);

  const scheme = useSelector((state) => state.config.scheme);
  const lang = useSelector((state) => state.config.language);
  const dispatch = useDispatch();
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
  const setLanguage = (set) => {
    dispatch(configActions.switchLang(set));
    updateConfigInClound.language.set.language(set, userId);
  };

  const languageComponent = (setLang, name) => {
    return (
      <TouchableOpacity
        onPress={() => setLanguage(setLang)}
        style={{
          margin: 5,
          padding: 5,
          width: Dimensions.get("window").width * 0.9,
          flexDirection: "row",
          backgroundColor: Colors[scheme].backGround_one,
          shadowColor: Colors[scheme].drawerActive,
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 20,
          elevation: 7,
        }}
      >
        <Text
          style={{
            color: Colors[scheme].primarySecond,
            fontFamily: "Kanit_400Regular",
            marginLeft: 10,
            fontSize: fontScale(6),
          }}
        >
          {translate(name).toUpperCase()}
        </Text>
        <View>
          <Text>
            {lang === setLang ? (
              <Ionicons name="radio-button-on" size={24} color="black" />
            ) : (
              <Ionicons name="radio-button-off" size={24} color="black" />
            )}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.customTheme}>
      {languageComponent("default", "Polski")}
      {languageComponent("en", "English")}
    </View>
  );
};

export default LangScreeng;

const styles = StyleSheet.create({
  customTheme: {
    padding: 10,
  },
});
