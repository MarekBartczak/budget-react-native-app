import { StyleSheet, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import summaryCostCounter from "../../functions/summaryCostCounter";
import Chart from "../../components/chart/Chart";
import AddNewFixedExpenseComponent from "../../components/fixedExpense/addNewFixedExpense/AddNewFixedExpenseComponent";
import chartElement from "../../functions/ChartElement";
import SummaryCost from "../../components/summaryCost/SumaryCost";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";

const FixedExpenseScreen = (props) => {
  const fixedExpenseShowList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );

  const chartEl = chartElement(fixedExpenseShowList);

  return (
    <ExternalComponent>
      <View style={styles.component}>
        <Chart
          press={() => props.navigation.navigate("FixedExpensesList")}
          label={chartEl.label}
          data={chartEl.data}
        />
      </View>
      <View style={styles.component}>
        <SummaryCost cost={summaryCostCounter(fixedExpenseShowList)} />
      </View>
      <View style={styles.component}>
        <AddNewFixedExpenseComponent />
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({
  component: {
    marginBottom: 20,
  },
});

export default FixedExpenseScreen;
