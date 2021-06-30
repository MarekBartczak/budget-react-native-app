import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

import Chart from "../../components/chart/Chart";
import fixedExpense from "../../store/reducers/fixedExpense";
import chartElement from "../../functions/ChartElement";

const ExternalComponent = (props) => {
  return (
    <View>
      <LinearGradient
        colors={[
          Colors.gradientBackground.primary,
          Colors.gradientBackground.secondary,
        ]}
        style={styles.background}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {props.children}
      </View>
    </View>
  );
};

const FixedExpenseScreen = (props) => {
  const fixedExpenseShowList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );

  const chartEl = chartElement(fixedExpenseShowList);

  return (
    <ExternalComponent>
      <Chart press={() => {}} label={chartEl.label} data={chartEl.data} />
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});

export default FixedExpenseScreen;
