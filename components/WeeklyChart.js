import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Items from "../data/dummy-data";
import Colors from "../constants/Colors";

const WeeklyChart = (props) => {
  const lastDate = (days) => {
    const dateList = Items.map((el) => {
      return el.date;
    });
    const newList = (dateList) =>
      dateList.filter((a, b) => dateList.indexOf(a) === b);
    const workingDateList = newList(dateList);

    const currentDate = new Date(workingDateList[workingDateList.length - 1]);

    const newDate = currentDate.setDate(currentDate.getDate() - days);
    return new Date(newDate).toISOString().slice(0, 10);
  };

  const heightChart = (num) => {
    return { height: num };
  };

  const showChart = (day) => {
    const prevDay = lastDate(day);
    const currentDayItem = Items.filter((el) => el.date === prevDay);
    const sumOfCostsInCurrentDay = currentDayItem.reduce((a, b) => ({
      cost: a.cost + b.cost,
    }));
    return (
      <View style={styles.column}>
        <Text style={styles.date}>{lastDate(day).slice(5, 10)}</Text>
        <View>
          <Text style={{ fontSize: 10, color: Colors.accent }}>
            {sumOfCostsInCurrentDay.cost.toFixed(2)}zł
          </Text>
        </View>
        <View
          style={[
            styles.chart,
            heightChart(sumOfCostsInCurrentDay.cost.toFixed(2) * 0.1),
          ]}
        ></View>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.touch} onPress={props.press}>
      <View style={styles.component}>
        {showChart(6)}
        {showChart(5)}
        {showChart(4)}
        {showChart(3)}
        {showChart(2)}
        {showChart(1)}
        {showChart(0)}
      </View>
    </TouchableOpacity>
  );
};

export default WeeklyChart;

const styles = StyleSheet.create({
  touch: {
    backgroundColor: "white",

    // shadowColor: "black",
    // shadowOffset: { height: 3, width: 0 },
    // shadowOpacity: 0.24,
    // shadowRadius: 20,
    borderRadius: 20,
    width: "90%",
    height: 150,
    margin: 10,
  },
  component: {
    flexDirection: "row",
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  date: {
    transform: [{ rotate: "90deg" }],
    // flex: 1,
    color: Colors.primary,
    fontWeight: "bold",
    marginTop: 30,
  },
  chart: {
    backgroundColor: "black",
    width: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  column: {
    margin: 2,
    // height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
