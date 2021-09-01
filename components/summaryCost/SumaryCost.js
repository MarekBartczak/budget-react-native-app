import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";

const SumaryCost = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <View style={styles[`summaryCost_${scheme}`]}>
      <View style={styles.inner}>
        <Text style={styles[`textCost_${scheme}`]}>{props.cost}zł</Text>
      </View>
    </View>
  );
};

export default SumaryCost;

const styles = StyleSheet.create({
  summaryCost_light: {
    marginTop: 10,
    backgroundColor: Colors.light.primaryThird,
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryCost_dark: {
    marginTop: 10,
    backgroundColor: Colors.dark.primaryThird,
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
    alignItems: "center",
    justifyContent: "center",
  },
  textCost_light: {
    color: Colors.light.button,
    fontWeight: "bold",
    fontSize: 20,
  },
  textCost_dark: {
    color: Colors.dark.button,
    fontWeight: "bold",
    fontSize: 20,
  },
});
