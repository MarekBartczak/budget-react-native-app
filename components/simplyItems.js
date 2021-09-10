import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
const details = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <TouchableOpacity onPress={props.press}>
      <View
        style={{
          ...styles.details,
          ...{ backgroundColor: Colors[scheme].primaryThird },
        }}
      >
        <View style={{ ...styles.info }}>
          <Text style={{ color: Colors[scheme].primarySecond }}>
            {props.subCategory}
          </Text>
          <Text
            style={{
              ...styles.cost,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {props.cost}zł{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  details: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    // backgroundColor: Colors.light.primaryThird,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
  },
  info: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  cost: {
    // color: Colors.primary,
    fontWeight: "bold",
  },
});

export default details;
