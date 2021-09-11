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

const IncomeElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <TouchableOpacity
      style={{
        ...styles.element,
        ...{
          borderColor: Colors[scheme].primary,
          // shadowColor: Colors[scheme].button,
        },
      }}
      onPress={props.press}
    >
      <View style={styles.title}>
        <Text
          style={{
            ...styles.textTitle,
            ...{ color: Colors[scheme].primarySecond },
          }}
        >
          {props.el.title.toUpperCase()}
        </Text>
      </View>
      <View style={styles.description}>
        <Text
          style={{
            ...styles.textDate,
            ...{ color: Colors[scheme].primarySecond },
          }}
        >
          {props.el.date}
        </Text>
        <Text
          style={{
            ...styles.textCost,
            ...{ color: Colors[scheme].primarySecond },
          }}
        >
          {props.el.cost}zł
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default IncomeElement;

const styles = StyleSheet.create({
  element: {
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0.9,
    // shadowRadius: 10,
    width: Dimensions.get("window").width,
  },
  textTitle: {
    fontFamily: "Kanit_600SemiBold",
  },
  textCost: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  description: {
    alignItems: "center",
  },
});
