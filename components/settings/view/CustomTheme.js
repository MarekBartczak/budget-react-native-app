import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as configActions from "../../../store/actions/config";
import updateConfigInClound from "../../../functions/cloud/config/updateConfigInClound";
const CustomTheme = (props) => {
  const userId = useSelector((state) => state.auth.userID);
  const scheme = useSelector((state) => state.config.scheme);
  const dispatch = useDispatch();

  const updateInCloud = (title) => {
    updateConfigInClound.theme.set.colorSet(title, userId);
  };
  const setColors = (title) => {
    dispatch(configActions.getScheme(title));
    updateInCloud(title);
  };

  const themeElement = (title, name) => {
    return (
      <TouchableOpacity
        onPress={() => setColors(title)}
        style={{
          margin: 10,
          padding: 5,
          width: Dimensions.get("window").width * 0.9,
          flexDirection: "row",
          backgroundColor: Colors[scheme].primary,
          shadowColor: "black",
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: Colors[scheme].primarySecond,
            marginLeft: 10,
          }}
        >
          {name}
        </Text>
        <View
          style={{
            borderRadius: 20,
            flexDirection: "row",
            overflow: "hidden",
            borderColor: Colors[title].backGroundOne,
            borderWidth: 2,
          }}
        >
          <View
            style={{
              height: 40,
              width: 20,
              backgroundColor: Colors[title].backGroundOne,
            }}
          ></View>
          <View
            style={{
              height: 40,
              width: 20,
              backgroundColor: Colors[title].primary,
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
