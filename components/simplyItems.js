import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const details = (props) => {
  return (
    <TouchableOpacity onPress={props.press}>
      <View style={styles.details}>
        <View style={styles.info}>
          <Text>
            {props.name} [x{props.multiply}]
          </Text>
          <Text style={styles.cost}>
            {props.cost}zł{" "}
            <Text style={{ fontWeight: "normal" }}>
              [{props.cost * props.multiply}zł]
            </Text>
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
    backgroundColor: Colors.defaultThemeLight.white,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  info: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  cost: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default details;
