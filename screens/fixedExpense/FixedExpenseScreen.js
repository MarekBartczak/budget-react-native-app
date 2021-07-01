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
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
  component: {
    marginBottom: 20,
  },
});

export default FixedExpenseScreen;
