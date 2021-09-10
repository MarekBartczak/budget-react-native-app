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
        ...{ borderColor: Colors[scheme].primaryThird },
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
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    // shadowColor: "black",
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    width: Dimensions.get("window").width,
  },
});
