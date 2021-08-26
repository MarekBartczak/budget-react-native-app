import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const SumaryCost = (props) => {
  return (
    <View style={styles.summaryCost}>
      <View style={styles.inner}>
        <Text style={styles.textCost}>{props.cost}zł</Text>
      </View>
    </View>
  );
};

export default SumaryCost;

const styles = StyleSheet.create({
  summaryCost: {
    marginTop: 10,
    backgroundColor: Colors.defaultThemeLight.buttton,
    width: Dimensions.get("window").width * 0.9,
    height: 50,

    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    height: "70%",
    width: "95%",
    borderRadius: 7,
    // borderWidth: 3,
    // borderColor: Colors.gradientBackground.third,
    alignItems: "center",
    justifyContent: "center",
  },
  textCost: {
    color: Colors.defaultThemeLight.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
});
