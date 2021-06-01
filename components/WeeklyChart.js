import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Items from "../data/dummy-data";

const WeeklyChart = (props) => {
  const lastDate = (days) => {
    const currentDate = new Date();
    const newDate = currentDate.setDate(currentDate.getDate() - days);
    return new Date(newDate).toISOString().slice(0, 10);
  };

  const heightChart = (num) => {
    return { height: num };
  };

  const showChart = (day, sum) => {
    const prevDay = lastDate(day);
    const currentDayItem = Items.filter((el) => el.date === prevDay);
    // console.log(currentDayItem);
    const sumOfCostsInCurrentDay = currentDayItem.reduce((a, b) => ({
      cost: a.cost + b.cost,
    }));
    // console.log(sumOfCostsInCurrentDay.cost.toFixed(2));
    return (
      <View style={styles.column}>
        <Text style={styles.date}>{lastDate(day).slice(5, 10)}</Text>
        <View>
          <Text style={{ fontSize: 10 }}>
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
        {showChart(6, 140)}
        {showChart(5, 45)}
        {showChart(4, 32)}
        {showChart(3, 53)}
        {showChart(2, 24)}
        {showChart(1, 10)}
        {showChart(0, 3)}
      </View>
    </TouchableOpacity>
  );
};

export default WeeklyChart;

const styles = StyleSheet.create({
  touch: {
    backgroundColor: "white",

    shadowColor: "black",
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.24,
    shadowRadius: 20,
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
    color: "#BB2343",
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
