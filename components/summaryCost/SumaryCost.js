import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import months from "../../data/months";

const SumaryCost = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const date = new Date();
  const currentMonthNumber = date.getMonth();
  const currentYear = date.getFullYear();
  const [month, setMonth] = useState(months[currentMonthNumber]);
  const [year, setYear] = useState(currentYear);
  const [index, setIndex] = useState(0);

  const dateList = [...new Set(props.dateList.map((el) => el.date.slice(0, 7)))]
    .sort()
    .map((el) => el + "-01");

  const dateListWithObj = dateList
    .map((el) => {
      return {
        year: el.slice(0, 4),
        monthNumber: el.slice(5, 7),
        monthName: months[Number(el.slice(5, 7))],
      };
    })
    .sort();

  const switchMonth = (change) => {
    setIndex(
      index + change < [dateListWithObj.length] && index + change >= 0
        ? index + change
        : 0
    );

    setYear(dateListWithObj[index].year);
    setMonth(dateListWithObj[index].monthName);
  };

  return (
    <View style={styles[`summaryCost_${scheme}`]}>
      <TouchableOpacity onPress={() => switchMonth(-1)}>
        <Ionicons
          name="ios-arrow-back"
          size={43}
          color={Colors[scheme].primarySecond}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles[`textCost_${scheme}`]}>{props.cost}zł</Text>
        <Text style={styles[`textDate_${scheme}`]}>
          {year} {month}
        </Text>
      </View>
      <TouchableOpacity onPress={() => switchMonth(1)}>
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
    textAlign: "center",
  },
  textCost_dark: {
    color: Colors.dark.button,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
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
