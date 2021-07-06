import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import Chart from "../../components/chart/Chart";
import chartElement from "../../functions/ChartElement";
import summaryCostCounter from "../../functions/summaryCostCounter";
import SummaryCost from "../../components/summaryCost/SumaryCost";
import { useSelector } from "react-redux";

const FixedIncomeScreen = (props) => {
  const fixedIncomeList = useSelector((state) => state.fixedIncome.fixedIncome);
  const chartEl = chartElement(fixedIncomeList);

  return (
    <ExternalComponent>
      <View style={styles.component}>
        <Chart
          press={() => props.navigation.navigate("FixedIncomeList")}
          label={chartEl.label}
          data={chartEl.data}
        />
      </View>
      <View style={styles.component}>
        <SummaryCost cost={summaryCostCounter(fixedIncomeList)} />
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({
  component: {
    marginBottom: 20,
  },
});

export default FixedIncomeScreen;
