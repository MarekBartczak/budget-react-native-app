import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <View style={styles.btn}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.banner,
    shadowOffset: { height: 0, width: 10 },
    shadowColor: Colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
});
