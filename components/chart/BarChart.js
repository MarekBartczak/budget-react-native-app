import { BarChart, LineChart } from "react-native-chart-kit";
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
  const selectedDate = useSelector((state) => state.item.view);
  const date = new Date();
  const currentMonthNumber = date.getMonth() + 1;
  const currentYear = date.getFullYear();
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
  if (selectedDate.year === "" && selectedDate.month === "") {
    currentDateFormat = `${currentYear}-${getMonthNumber()}-`;
  } else {
    currentDateFormat = `${selectedDate.year}-${selectedDate.month}-`;
  }
  let filteredData;
  if (props.label.length > 0) {
    const indexList = props.label.map((el) => el.includes(currentDateFormat));

    filteredData = {
      label: indexList
        .map((el, i) => {
          if (el) {
            return props.label[i];
          }
        })
        .filter((el) => el !== undefined),
      data: indexList
        .map((el, i) => {
          if (el) {
            return props.data[i];
          }
        })
        .filter((el) => el !== undefined),
    };
  }
  let label = props.label;
  let data = props.label;
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
        paddingBottom: 5,
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
          withHorizontalLines={false}
          withVerticalLines={false}
          withHorizontalLabels={false}
          withhadow={true}
          withInnerLines={false}
          width={Dimensions.get("window").width * 0.9}
          height={Dimensions.get("window").height * 0.3}
          chartConfig={{
            labelColor: () => Colors[scheme].headerTintColor,
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            // backgroundGradientFromOpacity: scheme === "dark" ? 0.8 : 0.6,
            // backgroundGradientToOpacity: scheme === "dark" ? 0.8 : 0.6,
            backgroundGradientFrom: Colors[scheme].primaryThird,
            backgroundGradientTo: Colors[scheme].primaryThird,
            decimalPlaces: 2,
            color: () => Colors[scheme].headerTintColor,
          }}
          bezier
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
        />
        {/* <View style={styles.valMin}>
          <Text
            style={{
              ...styles.valMinText,
              ...{ color: Colors[scheme].primarySecond },
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
    top: 10,
    zIndex: 1,
  },
  valMaxText: { fontSize: 10 },
  valMinText: { fontSize: 10 },
  valMin: {
    left: 10,
    top: 180 - 40,
    position: "absolute",
  },
});
