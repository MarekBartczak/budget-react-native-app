import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Items from "../data/dummy-data";
import Colors from "../constants/Colors";

const Chart = (props) => {
  const dateList = Items.map((el) => el.date);
  const newDateList = (dateList) =>
    dateList.filter((a, b) => dateList.indexOf(a) === b);
  const workingDateList = newDateList(dateList);

  const calculateSum = (list, index) => {
    const filteredItems = Items.filter((el) => el.date === list[index]);
    const filteredCostArray = filteredItems.map((el) => el.cost);
    const filteredCost = (total, sum) => total + sum;
    return filteredCostArray.reduce(filteredCost).toFixed(2);
  };

  let lastWeekDateArray = [];
  let sumOfCostLastWeekItems = [];
  for (let i = 6; i >= 0; i--) {
    lastWeekDateArray.push(
      workingDateList[workingDateList.length - 1 - i].slice(5, 10)
    );
    sumOfCostLastWeekItems.push(
      calculateSum(workingDateList, workingDateList.length - 1 - i)
    );
  }

  return (
    <View>
      <TouchableOpacity onPress={props.press}>
        <LineChart
          data={{
            labels: lastWeekDateArray,
            datasets: [
              {
                data: sumOfCostLastWeekItems,
              },
            ],
          }}
          withHorizontalLines={false}
          withVerticalLines={true}
          withHorizontalLabels={true}
          withShadow={false}
          width={Dimensions.get("window").width * 0.9}
          height={200}
          chartConfig={{
            labelColor: () => "black",
            backgroundColor: "rgba(4, 4, 4, 1)",
            backgroundGradientFrom: "rgba(242, 242, 242, 1)",
            backgroundGradientTo: "rgba(242,242, 242, 1)",

            decimalPlaces: 2,
            color: () => Colors.primary,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 18,
            borderRadius: 16,
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get("window").width * 0.9,
            marginHorizontal: "5%",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});
