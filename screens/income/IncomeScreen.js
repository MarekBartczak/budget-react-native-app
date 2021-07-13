import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import Chart from "../../components/chart/Chart";
import chartElement from "../../functions/ChartElement";
import summaryCostCounter from "../../functions/summaryCostCounter";
import SummaryCost from "../../components/summaryCost/SumaryCost";
import AddNewIncomeComponent from "../../components/income/addNewIncome/AddNewIncomeComponent";
const IncomeScreen = (props) => {
  const incomeList = useSelector((state) => state.income.income);

  const chartEl = chartElement(incomeList);

  return (
    <ExternalComponent>
      <View style={styles.component}>
        <Chart
          press={() => props.navigation.navigate("IncomeList")}
          label={chartEl.label}
          data={chartEl.data}
        />
      </View>
      <View style={styles.component}>
        <SummaryCost cost={summaryCostCounter(incomeList)} />
      </View>
      <View style={styles.component}>
        <AddNewIncomeComponent />
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({
  component: {
    marginBottom: 20,
  },
});

export default IncomeScreen;
