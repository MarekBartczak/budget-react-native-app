import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const SumaryCost = (props) => {
  return (
    <View style={styles.summaryCost}>
      <Text style={styles.textCost}>{props.cost}zł</Text>
    </View>
  );
};

export default SumaryCost;

const styles = StyleSheet.create({
  summaryCost: {
    backgroundColor: Colors.accent,
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    // shadowOffset: { height: 0, width: 10 },
    // shadowColor: Colors.shadowColor,
    // shadowOpacity: 0.9,
    // shadowRadius: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textCost: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 30,
  },
});
