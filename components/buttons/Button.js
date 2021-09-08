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
      <View style={styles.inner}>
        <View style={styles.btn}>
          <Text style={styles[`text_${scheme}`]}>{props.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button_light: {
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    backgroundColor: Colors.light.button,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  button_dark: {
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    backgroundColor: Colors.dark.button,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    borderRadius: 7,
    height: "70%",
    width: "95%",
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
    color: Colors.light.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  text_dark: {
    color: Colors.dark.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
});
