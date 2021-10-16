import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Chart from "../../components/chart/Chart";
import Colors from "../../constants/Colors";
import chartElement from "../../functions/ChartElement";
import SummaryCost from "../../components/summaryCost/SummaryCost";
import AddNewItem from "../../components/AddNewItem";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import UnpaidExpense from "../../components/fixedExpense/unpaidExpense/UnpaidExpense";

const FixedExpenseScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const fixedExpenseShowList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );

  const delayCost = useSelector((state) => state.fixedExpense.delayCost);

  const chartEl = chartElement(
    fixedExpenseShowList.filter((el) => el.isPaid === true)
  );

  return (
    <ExternalComponent>
      <View style={styles.component}>
        <SummaryCost type="fixedExpense" list={chartEl} />
      </View>
      <View style={styles.chartCcomponent}>
        <Chart
          type="fixedExpense"
          press={() => props.navigation.navigate("FixedExpensesList")}
          obj={chartEl}
        />
      </View>
      <View style={styles.unPaidComponent}>
        <UnpaidExpense />
      </View>
      <View style={styles.component}>
        {Number(delayCost) === 0 ? (
          <Text
            style={{
              color: Colors[scheme].primarySecond,
              fontFamily: "Kanit_400Regular",
            }}
          >
            {"Brak zaległych rachunków".toUpperCase()}
          </Text>
        ) : (
          <Text
            style={{
              color: Colors[scheme].primarySecond,
              fontFamily: "Kanit_400Regular",
            }}
          >
            {"Zaległe rachunki na kwotę:".toUpperCase()}{" "}
            <Text style={{ color: "red", fontFamily: "Kanit_400Regular" }}>
              {" "}
              {delayCost}zł{" "}
            </Text>
          </Text>
        )}
      </View>

      <View style={styles.buttonComponent}>
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
  fixedComponent: {
    width: Dimensions.get("window").width * 0.9,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  unPaidComponent: {
    marginTop: 50,
  },
  component: {},
  chartCcomponent: {
    overflow: "hidden",
    paddingBottom: 15,
  },
  buttonComponent: {
    position: "absolute",
    bottom: 40,
  },
});

export default FixedExpenseScreen;
