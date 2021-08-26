import { LineChart } from "react-native-chart-kit";
import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const Chart = (props) => {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // props.label and props.data shoud be same length
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return (
    <View style={styles.chartView}>
      <TouchableOpacity onPress={props.press}>
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
          withVerticalLines={true}
          withHorizontalLabels={true}
          withShadow={false}
          width={Dimensions.get("window").width * 0.9}
          height={180}
          chartConfig={{
            labelColor: () => Colors.defaultThemeLight.primaryDark,
            backgroundGradientFromOpacity: 1,
            backgroundGradientToOpacity: 1,
            backgroundGradientFrom: Colors.gradientBackground.primary,
            backgroundGradientTo: Colors.gradientBackground.primary,
            decimalPlaces: 2,
            color: () => Colors.defaultThemeLight.primaryDark,
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
    borderRadius: 16,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
  },
  chartView: {
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
});
