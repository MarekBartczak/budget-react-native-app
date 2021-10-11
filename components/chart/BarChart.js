import { LineChart, BarChart } from "react-native-chart-kit";
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";

const Chart = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  let selectedDate;
  // to fixed ^^^
  const getType = props.type;

  let getObj = props.obj;

  let dateList = getObj.map((el) => el.date);
  let getLatestDate = dateList[dateList.length - 1];
  let sliced = "";
  if (getLatestDate !== undefined) {
    sliced = getLatestDate.slice(0, 7);
  }

  let filteredObj = getObj.filter((el) => el.date.includes(sliced));
  let label = filteredObj.map((el) => el.date.split("-")[2]);
  let data = filteredObj.map((el) => el.cost);

  const checkIfDateIsSelected = (type) => {
    switch (type) {
      case "expense":
        selectedDate = useSelector((state) => state.summary.expense);
        if (selectedDate !== "") {
          let getFilteredObj = getObj.filter((el) =>
            el.date.includes(selectedDate)
          );
          label = getFilteredObj.map((el) => el.date.split("-")[2]);
          data = getFilteredObj.map((el) => el.cost);
        }
      case "fixedExpense":
        selectedDate = useSelector((state) => state.summary.fixedExpense);
        if (selectedDate !== "") {
          let getFilteredObj = getObj.filter((el) =>
            el.date.includes(selectedDate)
          );
          label = getFilteredObj.map((el) => el.date.split("-")[2]);
          data = getFilteredObj.map((el) => el.cost);
        }
      case "income":
        selectedDate = useSelector((state) => state.summary.income);
        if (selectedDate !== "") {
          let getFilteredObj = getObj.filter((el) =>
            el.date.includes(selectedDate)
          );
          label = getFilteredObj.map((el) => el.date.split("-")[2]);
          data = getFilteredObj.map((el) => el.cost);
        }
    }
  };

  checkIfDateIsSelected(getType);

  let filteredData;

  if (filteredData !== undefined) {
    label = filteredData.label.map((el) => el.slice(8));
    data = filteredData.data;
  }

  return (
    <View
      style={{
        backgroundColor: Colors[scheme].backGroundOne,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,

        shadowColor: "black",
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        paddingBottom: 45,
      }}
    >
      <TouchableOpacity onPress={props.press}>
        {/* <View style={styles.valMax}>
          <Text
            style={{
              ...styles.valMaxText,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {data.length > 0
              ? Math.max
                  .apply(
                    Math,
                    data.map((el) => Number(el))
                  )
                  .toFixed(2)
              : 0}
          </Text>
        </View> */}
        <BarChart
          data={{
            labels: label,
            datasets: [
              {
                data: data,
              },
            ],
          }}
          // verticalLabelRotation={-90}
          withVerticalLines={false}
          withVerticalLabels={true}
          withHorizontalLines={false}
          withHorizontalLabels={true}
          withDots={true}
          withshadow={false}
          withInnerLines={false}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").height * 0.25}
          chartConfig={{
            labelColor: () => Colors[scheme].headerTintColor,
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            // backgroundGradientFromOpacity: scheme === "dark" ? 0.8 : 0.6,
            // backgroundGradientToOpacity: scheme === "dark" ? 0.8 : 0.6,
            // backgroundGradientFrom: Colors[scheme].button,
            // backgroundGradientTo: Colors[scheme].button,

            propsForDots: {
              r: "2",
              strokeWidth: "2",
              stroke: Colors[scheme].headerTintColor,
            },

            decimalPlaces: 0,
            color: () => Colors[scheme].headerTintColor,
          }}
          style={{
            ...styles.chart,
            ...{
              marginTop: 10,
              shadowOffset: { height: -10, width: -10 },
              shadowRadius: 1,
              shadowColor: Colors[scheme].headerTintColor,
              shadowOpacity: 0.1,
            },
          }}
          bezier
        />
        {/* <View style={styles.valMin}>
          <Text
            style={{
              ...styles.valMinText,
              ...{
                color: Colors[scheme].primarySecond,
              },
            }}
          >
            {data > 0
              ? Math.min
                  .apply(
                    Math,
                    data.map((el) => Number(el))
                  )
                  .toFixed(2)
              : 0}
          </Text>
        </View> */}
      </TouchableOpacity>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chart: {
    paddingTop: 0,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },

  valMax: {
    position: "absolute",
    left: 10,
    top: -10,
    zIndex: 1,
  },
  valMaxText: { fontSize: 10 },
  valMinText: { fontSize: 10 },
  valMin: {
    left: 10,
    top: Dimensions.get("window").height * 0.3 - 50,
    position: "absolute",
  },
});
