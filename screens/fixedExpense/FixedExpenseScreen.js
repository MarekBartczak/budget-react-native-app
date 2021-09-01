import { StyleSheet, View, Text, useColorScheme } from "react-native";
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
import UnpaidExpense from "../../components/fixedExpense/unpaidExpense/UnpaidExpense";
const FixedExpenseScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const fixedExpenseShowList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );
  const fixedExpenseHistory = useSelector(
    (state) => state.fixedExpense.history
  );

  const delayCost = useSelector((state) => state.fixedExpense.delayCost);

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
        <Text style={{ color: Colors[scheme].primarySecond }}>
          Stałe oplaty za dany miesiac
        </Text>
      </View>
      <View style={styles.component}>
        <UnpaidExpense />
      </View>
      <View style={styles.component}>
        {Number(delayCost) === 0 ? (
          <Text style={{ color: Colors[scheme].primarySecond }}>
            Brak zaległych rachunków
          </Text>
        ) : (
          <Text style={{ color: Colors[scheme].primarySecond }}>
            Zaległe rachunki na kwotę:{" "}
            <Text style={{ color: "red" }}> {delayCost}zł </Text>
          </Text>
        )}
      </View>
      <View style={styles.component}>
        <AddNewItem
          navigateTo={() =>
            props.navigation.navigate("AddNewFixedExpenseScreen")
          }
          setPlace={() => {}}
          text={"Nowe stałe wydatki"}
        />
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({
  component: {
    marginBottom: 20,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
});

export default FixedExpenseScreen;
