import { LineChart } from "react-native-chart-kit";
import React from "react";
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
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // props.label and props.data shoud be same length
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // console.log(props.data);
  return (
    <View style={styles.chartView}>
      <TouchableOpacity onPress={props.press}>
        <View style={styles.valMax}>
          <Text
            style={{
              ...styles.valMaxText,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {props.data.length > 0
              ? Math.max.apply(
                  Math,
                  props.data.map((el) => Number(el))
                )
              : 0}
          </Text>
        </View>
        <LineChart
          data={{
            labels: props.label,
            datasets: [
              {
                data: props.data,
              },
            ],
          }}
          withHorizontalLines={false}
          withVerticalLines={false}
          withHorizontalLabels={false}
          withShadow={false}
          width={Dimensions.get("window").width * 0.9}
          height={180}
          chartConfig={{
            labelColor: () => Colors[scheme].primarySecond,
            backgroundGradientFromOpacity: scheme === "dark" ? 0.8 : 0.6,
            backgroundGradientToOpacity: scheme === "dark" ? 0.8 : 0.6,
            backgroundGradientFrom: Colors[scheme].primaryThird,
            backgroundGradientTo: Colors[scheme].primaryThird,
            decimalPlaces: 2,
            color: () => Colors[scheme].primarySecond,
          }}
          bezier
          style={styles.chart}
        />
        <View style={styles.valMin}>
          <Text
            style={{
              ...styles.valMinText,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {props.data > 0
              ? Math.min.apply(
                  Math,
                  props.data.map((el) => Number(el))
                )
              : 0}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chart: {
    borderRadius: 16,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
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
