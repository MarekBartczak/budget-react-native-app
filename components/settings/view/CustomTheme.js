import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as configActions from "../../../store/actions/config";
import updateConfigInClound from "../../../functions/cloud/config/updateConfigInClound";
import fontScale from "../../../constants/FontScale";
import { dataLang, selectLang } from "../../../lang/lang";
const CustomTheme = (props) => {
  const userId = useSelector((state) => state.auth.userID);
  const scheme = useSelector((state) => state.config.scheme);
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };

  const updateInCloud = (title) => {
    updateConfigInClound.theme.set.colorSet(title, userId);
  };
  const setColors = (title) => {
    dispatch(configActions.getScheme(title));
    updateInCloud(title);
  };
  const cirlceSize = 15;
  const themeElement = (title, name) => {
    return (
      <TouchableOpacity
        onPress={() => setColors(title)}
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
        <View
          style={{
            borderRadius: fontScale(cirlceSize),
            flexDirection: "row",
            overflow: "hidden",
            borderColor: Colors[title].backGroundOne,
            borderWidth: 2,
          }}
        >
          <View
            style={{
              height: fontScale(cirlceSize),
              width: fontScale(cirlceSize) / 2,
              backgroundColor: Colors[title].backGroundOne,
            }}
          ></View>
          <View
            style={{
              height: fontScale(cirlceSize),
              width: fontScale(cirlceSize) / 2,
              backgroundColor: Colors[title].backGround_one,
            }}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.customTheme}>
      {themeElement("light_Blue", "Jasny niebieski")}
      {themeElement("light_Pink", "Jasny różowy")}
      {themeElement("light_Gold", "Jasny złoty")}
      {themeElement("light", "Jasny zielony")}
      {themeElement("dark", "Ciemny")}
    </View>
  );
};

export default CustomTheme;

const styles = StyleSheet.create({
  customTheme: {
    padding: 10,
  },
});
