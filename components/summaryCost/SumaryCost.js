import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const SumaryCost = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <View style={styles[`summaryCost_${scheme}`]}>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons
          name="ios-arrow-back"
          size={43}
          color={Colors[scheme].primarySecond}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles[`textCost_${scheme}`]}>{props.cost}zł</Text>
        <Text style={styles[`textDate_${scheme}`]}>Luty</Text>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons
          name="ios-arrow-forward"
          size={43}
          color={Colors[scheme].primarySecond}
        />
      </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryCost_dark: {
    marginTop: 10,
    backgroundColor: Colors.dark.primaryThird,
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  textDate_light: {
    color: Colors.light.primarySecond,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  textDate_dark: {
    color: Colors.dark.primarySecond,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
