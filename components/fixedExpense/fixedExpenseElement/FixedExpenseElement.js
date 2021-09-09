import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";

const checkPayDate = (date) => {
  return new Date() > new Date(date) ? "red" : "green";
};

const FixedExpenseElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <TouchableOpacity
      style={{
        ...styles.element,
        ...{ backgroundColor: Colors[scheme].primaryThird },
      }}
      onPress={props.press}
    >
      <View style={styles.title}>
        <Text style={{ color: Colors[scheme].primarySecond }}>
          {props.el.title}
        </Text>
      </View>
      <View style={styles.description}>
        <Text style={{ color: checkPayDate(props.el.date) }}>
          {props.el.date}
        </Text>
        <Text style={{ color: Colors[scheme].primarySecond }}>
          {props.el.cost}zł
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FixedExpenseElement;

const styles = StyleSheet.create({
  element: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // shadowColor: "black",
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    width: Dimensions.get("window").width * 0.9,
    marginHorizontal: Dimensions.get("window").width * 0.05,
  },
});
