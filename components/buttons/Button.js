import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.button, ...props.style }}
    >
      <View style={styles.btn}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    backgroundColor: Colors.transparent,
    // shadowOffset: { height: 0, width: 10 },
    // shadowColor: Colors.shadowColor,
    // shadowOpacity: 0.9,
    // shadowRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
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
