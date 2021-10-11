import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import Chart from "../../components/chart/BarChart";
import chartElement from "../../functions/ChartElement";
import SummaryCost from "../../components/summaryCost/SummaryCost";
import AddNewIncomeComponent from "../../components/income/addNewIncome/AddNewIncomeComponent";
const IncomeScreen = (props) => {
  const incomeList = useSelector((state) => state.income.income);
  const config = useSelector((state) => state.config);
  const chartEl = chartElement(incomeList);
  const type = "income";

  return (
    <ExternalComponent>
      <View style={styles.component}>
        <SummaryCost type={type} list={incomeList} />
      </View>
      <View style={styles.chartComponent}>
        {!config.addIncomeKeyboardStatus && (
          <Chart
            type={type}
            press={() => props.navigation.navigate("IncomeList")}
            obj={chartEl}
          />
        )}
      </View>
      <View style={styles.component}>
        <AddNewIncomeComponent />
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({
  component: {},
  chartComponent: {
    overflow: "hidden",
    paddingBottom: 5,
  },
  buttonComponent: {
    position: "absolute",
    bottom: 20,
  },
});

export default IncomeScreen;
