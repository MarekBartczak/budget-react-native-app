import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";

const IncomeElement = (props) => {
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

export default IncomeElement;

const styles = StyleSheet.create({
  element: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.primaryThird,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
    width: Dimensions.get("window").width * 0.9,
    marginHorizontal: Dimensions.get("window").width * 0.05,
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
