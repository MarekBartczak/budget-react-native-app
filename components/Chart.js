import { LineChart } from "react-native-chart-kit";
import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

const Chart = (props) => {
  const itemsFromRedux = useSelector((state) => state.item.items);
  const dateList = itemsFromRedux.map((el) => el.date);
  let lastWeekDateArray = [];

  const newDateList = (dateList) =>
    dateList.filter((a, b) => dateList.indexOf(a) === b);
  const workingDateList = newDateList(dateList);

  const calculateSum = (list, index) => {
    const filteredItems = itemsFromRedux.filter(
      (el) => el.date === list[index]
    );
    const filteredCostArray = filteredItems.map((el) => el.cost);
    const filteredCost = (total, sum) => total + sum;
    return filteredCostArray.reduce(filteredCost).toFixed(2);
  };

  for (let i = 6; i >= 0; i--) {
    let newItem = workingDateList[workingDateList.length - 1 - i].slice(5, 10);
    lastWeekDateArray.push({
      id: Number(newItem.replace("-", "")),
      date: newItem,
      cost: calculateSum(workingDateList, workingDateList.length - 1 - i),
    });
  }
  lastWeekDateArray.sort((a, b) => a.id - b.id);

  return (
    <View>
      <TouchableOpacity onPress={props.press}>
        <LineChart
          data={{
            labels: lastWeekDateArray.map((el) => el.date),
            datasets: [
              {
                data: lastWeekDateArray.map((el) => el.cost),
              },
            ],
          }}
          withHorizontalLines={false}
          withVerticalLines={true}
          withHorizontalLabels={true}
          withShadow={false}
          width={Dimensions.get("window").width * 0.9}
          height={180}
          chartConfig={{
            labelColor: () => "black",
            backgroundGradientFrom: Colors.backGround,
            backgroundGradientTo: Colors.backGroundChart,
            decimalPlaces: 2,
            color: () => Colors.backGround2,
          }}
          bezier
          style={styles.chart}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chart: {
    marginVertical: 18,
    borderRadius: 16,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
    marginHorizontal: "5%",
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: { height: 10, width: 10 },
    shadowColor: Colors.primary,
  },
});
