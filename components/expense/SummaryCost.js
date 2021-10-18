import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
const SummaryCost = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  return (
    <View
      style={{
        ...styles.summaryCost,
        ...{ borderColor: Colors[scheme].separator },
      }}
    >
      <Text
        style={{
          ...styles.summaryCostText,
          ...{ color: Colors[scheme].primarySecond },
        }}
      >
        {props.cost.toFixed(2)} PLN
      </Text>
    </View>
  );
};

export default SummaryCost;

const styles = StyleSheet.create({
  summaryCost: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryCostText: {
    fontSize: 20,
    padding: 10,
    fontFamily: "Kanit_600SemiBold",
  },
});
