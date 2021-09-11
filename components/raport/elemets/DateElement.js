import { StyleSheet, Text, View, useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import React from "react";
import { useSelector } from "react-redux";
import Months from "../../../data/months";

const DateElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const date = props.element;
  const year = date.slice(0, 4);
  const monthIndex = date.slice(5);
  const month = Months[Number(monthIndex - 1)];
  return (
    <View
      style={{
        ...styles.element,
        ...{ borderColor: Colors[scheme].primary },
      }}
    >
      <Text style={{ ...styles.text, ...{ color: Colors[scheme].button } }}>
        {month.toUpperCase()} {year.toUpperCase()}
      </Text>
    </View>
  );
};

export default DateElement;

const styles = StyleSheet.create({
  element: {
    borderBottomWidth: 1,
    margin: 5,
    padding: 5,
    // shadowOffset: { height: 0, width: 0 },
    // shadowRadius: 7,
    // shadowColor: "black",
    // shadowOpacity: 0.3,

    // borderRadius: 10,
  },
  text: {
    fontSize: 15,
    fontFamily: "Kanit_400Regular",
    textAlign: "center",
  },
});
