import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
const FixedIncomeElement = (props) => {
  return (
    <TouchableOpacity style={styles.element} onPress={props.press}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>{props.el.title}</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.textDate}>
          {props.el.date.replace("-", ".").replace("-", ".")}
        </Text>
        <Text style={styles.textCost}>{props.el.cost}zł</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FixedIncomeElement;

const styles = StyleSheet.create({
  element: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.transparent,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTitle: {
    color: "black",
  },
  textCost: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  description: {
    alignItems: "center",
  },
});
