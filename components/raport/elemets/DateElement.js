import { StyleSheet, Text, View, useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import React from "react";
import { useSelector } from "react-redux";

const DateElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <View
      style={{
        ...styles.element,
        ...{ backgroundColor: Colors[scheme].primaryThird },
      }}
    >
      <Text
        style={{ ...styles.text, ...{ color: Colors[scheme].primarySecond } }}
      >
        {props.element}
      </Text>
    </View>
  );
};

export default DateElement;

const styles = StyleSheet.create({
  element: {
    margin: 5,
    padding: 5,
    // shadowOffset: { height: 0, width: 0 },
    // shadowRadius: 7,
    // shadowColor: "black",
    // shadowOpacity: 0.3,

    // borderRadius: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
