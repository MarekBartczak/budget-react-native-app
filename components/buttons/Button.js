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
      <View style={styles.inner}>
        <View style={styles.btn}>
          <Text style={styles.text}>{props.text}</Text>
        </View>
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
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    backgroundColor: Colors.accent,
    borderRadius: 7,
    height: "70%",
    width: "95%",
    borderWidth: 3,
    borderColor: Colors.gradientBackground.primary,
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
  text: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
});
