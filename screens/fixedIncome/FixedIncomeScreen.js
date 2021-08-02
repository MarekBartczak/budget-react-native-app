import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import BarChart from "../../components/chart/BarChart";
import chartElement from "../../functions/ChartElement";
import summaryCostCounter from "../../functions/summaryCostCounter";
import SummaryCost from "../../components/summaryCost/SumaryCost";
import AddNewFixedIncomeComponent from "../../components/fixedIncome/addFixedIncome/AddNewFixedIncomeComponent";
import { useSelector } from "react-redux";

const FixedIncomeScreen = (props) => {
  const fixedIncomeList = useSelector((state) => state.fixedIncome.fixedIncome);
  const chartEl = chartElement(fixedIncomeList);

  return (
    <ExternalComponent>
      <View style={styles.component}>
        <SummaryCost cost={summaryCostCounter(fixedIncomeList)} />
      </View>
      <View style={styles.component}>
        <BarChart
          press={() => props.navigation.navigate("FixedIncomeList")}
          label={chartEl.label}
          data={chartEl.data}
        />
      </View>
      <View style={styles.component}>
        <AddNewFixedIncomeComponent />
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
