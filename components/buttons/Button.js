import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";

const Button = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles[`button_${scheme}`], ...props.style }}
    >
      <View style={styles.btn}>
        <Text style={styles[`text_${scheme}`]}>{props.text.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button_light: {
    backgroundColor: Colors.light.primary,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  button_dark: {
    backgroundColor: Colors.dark.primary,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text_light: {
    color: Colors.light.button,
    fontFamily: "Kanit_600SemiBold",
    fontSize: 15,
  },
  text_dark: {
    color: Colors.dark.button,
    fontFamily: "Kanit_600SemiBold",
    fontSize: 15,
  },
});
