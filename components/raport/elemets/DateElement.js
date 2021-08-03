import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";
import React from "react";
const DateElement = (props) => {
  return (
    <View style={styles.element}>
      <Text style={styles.text}>{props.element}</Text>
    </View>
  );
};

export default DateElement;

const styles = StyleSheet.create({
  element: {
    backgroundColor: Colors.default,
    margin: 5,
    padding: 5,

    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
