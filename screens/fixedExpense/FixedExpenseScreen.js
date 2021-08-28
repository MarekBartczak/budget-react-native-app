import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import summaryCostCounter from "../../functions/summaryCostCounter";
import Chart from "../../components/chart/Chart";
import Colors from "../../constants/Colors";
import AddNewFixedExpenseComponent from "../../components/fixedExpense/addNewFixedExpense/AddNewFixedExpenseComponent";
import chartElement from "../../functions/ChartElement";
import SummaryCost from "../../components/summaryCost/SumaryCost";
import AddNewItem from "../../components/AddNewItem";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FixedExpenseScreen = (props) => {
  const fixedExpenseShowList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );
  const fixedExpenseHistory = useSelector(
    (state) => state.fixedExpense.history
  );

  // const date = fixedExpenseHistory.map((el) => [el.date, el.cost]);
  // console.log("date", date);
  const chartEl = chartElement(fixedExpenseShowList);

  return (
    <ExternalComponent>
      <View style={styles.component}>
        <SummaryCost cost={summaryCostCounter(fixedExpenseShowList)} />
      </View>
      <View style={styles.component}>
        <Chart
          press={() => props.navigation.navigate("FixedExpensesList")}
          label={chartEl.label}
          data={chartEl.data}
        />
      </View>

      <View style={styles.component}>
        <Text>Stałe oplaty za dany miesiac</Text>
        {/* <AddNewFixedExpenseComponent /> */}
      </View>
      <View style={styles.component}>
        <AddNewItem
          navigateTo={() =>
            props.navigation.navigate("AddNewFixedExpenseScreen")
          }
          setPlace={() => {}}
          text={"Nowe stałe wydatki"}
          icon={
            <MaterialCommunityIcons
              name="credit-card-clock-outline"
              size={44}
              color={Colors.defaultThemeLight.primary}
            />
          }
        />
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({
  component: {
    // marginTop: 20,
    marginBottom: 20,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
});

export default FixedExpenseScreen;
