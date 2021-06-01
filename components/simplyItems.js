import { StyleSheet, Text, View } from "react-native";
import React from "react";

const details = (props) => {
  return (
    <View style={styles.details}>
      <View style={styles.info}>
        <Text>{props.name}</Text>
        <Text>{props.cost}zł</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    margin: 10,

    padding: 20,
    shadowColor: "black",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },

  info: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default details;
