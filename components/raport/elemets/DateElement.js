import { StyleSheet, Text, View, useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import React from "react";
import { useSelector } from "react-redux";
import Months from "../../../data/months";
import { dataLang, selectLang } from "../../../lang/lang";
const DateElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const date = props.element;
  const year = date.slice(0, 4);
  const monthIndex = date.slice(5);
  const month = Months[Number(monthIndex - 1)];
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
  return (
    <View
      style={{
        ...styles.element,
        ...{ borderColor: Colors[scheme].primary },
      }}
    >
      <Text
        style={{ ...styles.text, ...{ color: Colors[scheme].headerTintColor } }}
      >
        {translate(month).toUpperCase()} {year.toUpperCase()}
      </Text>
    </View>
  );
};

export default DateElement;

const styles = StyleSheet.create({
  element: {
    margin: 2,
    padding: 2,
    // shadowOffset: { height: 0, width: 0 },
    // shadowRadius: 7,
    // shadowColor: "black",
    // shadowOpacity: 0.3,
  },
  text: {
    fontSize: 15,
    fontFamily: "Kanit_400Regular",
    textAlign: "center",
  },
});
