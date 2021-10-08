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
  const date = new Date();
  const currentMonthNumber = date.getMonth() + 1;
  const currentYear = date.getFullYear();
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

  // useEffect(() => {
  //   checkIfDateIsSelected(getType);
  // });
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // props.label and props.data shoud be same length
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const getMonthNumber = () => {
    if (currentMonthNumber < 10) {
      return `0${currentMonthNumber}`;
    } else {
      return currentMonthNumber;
    }
  };
  let currentDateFormat;

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
          // console.log(selectedDate);
          // console.log(props.label);
          // let x = props.label.filter((el) => {
          //   return el.includes(selectedDate);
          // });
          // console.log(x);
          // label = props.label;
          // data = props.data;
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
    }
  };

  checkIfDateIsSelected(getType);

  // if (selectedDate.year === "" && selectedDate.month === "") {
  //   currentDateFormat = `${currentYear}-${getMonthNumber()}-`;
  // } else {
  //   currentDateFormat = `${selectedDate.year}-${selectedDate.month}-`;
  // }
  let filteredData;
  // if (props.label.length > 0) {
  //   const indexList = props.label.map((el) => el.includes(currentDateFormat));
  //   filteredData = {
  //     label: indexList
  //       .map((el, i) => {
  //         if (el) {
  //           return props.label[i];
  //         }
  //       })
  //       .filter((el) => el !== undefined),
  //     data: indexList
  //       .map((el, i) => {
  //         if (el) {
  //           return props.data[i];
  //         }
  //       })
  //       .filter((el) => el !== undefined),
  //   };
  // }
  // console.log(selectedDate);
  // const index = props.label.length;

  // if (index > 0) {
  //   label = props.label[index - 1];
  //   data = props.data[index - 1];
  // }

  // console.log(props.label);
  // console.log(props.data);

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
        <LineChart
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
