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
          ...{ borderColor: Colors[scheme].primaryThird },
        }}
      >
        <View style={{ ...styles.info }}>
          <Text
            style={{
              color: Colors[scheme].primarySecond,
              fontFamily: "Kanit_600SemiBold",
            }}
          >
            {props.subCategory.toUpperCase()}
          </Text>
          <Text
            style={{
              color: Colors[scheme].primarySecond,
              fontFamily: "Kanit_600SemiBold",
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
    borderBottomWidth: 1,
  },
  info: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default details;
