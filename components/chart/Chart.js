import { LineChart } from "react-native-chart-kit";
import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const Chart = (props) => {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // props.label and props.data shoud be same length
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return (
    <View>
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
            labelColor: () => Colors.primary,
            backgroundGradientFromOpacity: 1,
            backgroundGradientToOpacity: 1,
            backgroundGradientFrom: Colors.gradientBackground.primary,
            backgroundGradientTo: Colors.gradientBackground.primary,
            // backgroundGradientFrom: Colors.primary,
            // backgroundGradientTo: Colors.primary,
            decimalPlaces: 2,
            color: () => Colors.primary,
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
    // shadowOpacity: 0.9,
    // shadowRadius: 10,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: Colors.shadowColor,
  },
});
