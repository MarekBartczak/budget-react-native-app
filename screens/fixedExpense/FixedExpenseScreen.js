import { StyleSheet, View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Chart from "../../components/chart/Chart";
import Colors from "../../constants/Colors";
import chartElement from "../../functions/ChartElement";
import SummaryCost from "../../components/summaryCost/SummaryCost";
import AddNewItem from "../../components/AddNewItem";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import UnpaidExpense from "../../components/fixedExpense/unpaidExpense/UnpaidExpense";
import EmptyList from "../../components/emptyList/EmptyList";
const FixedExpenseScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const fixedExpenseMonthFilter = useSelector(
    (state) => state.summary.fixedExpense
  );
  const fixedExpenseShowList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );
  const [chartEl, setChartEl] = useState(
    chartElement(fixedExpenseShowList.filter((el) => true))
  );
  const [filter, setFilter] = useState(
    fixedExpenseShowList.filter((el) => true)
  );

  const delayCost = useSelector((state) => state.fixedExpense.delayCost);

  const chartElFilter = (filter) => {
    switch (filter) {
      case "isPaid":
        setChartEl(
          chartElement(fixedExpenseShowList.filter((el) => el.isPaid === true))
        );
        setFilter(fixedExpenseShowList.filter((el) => el.isPaid === true));

        return;

      case "isNotPaid":
        setChartEl(
          chartElement(fixedExpenseShowList.filter((el) => el.isPaid === false))
        );
        setFilter(fixedExpenseShowList.filter((el) => el.isPaid === false));

        return;

      case "all":
        setChartEl(chartElement(fixedExpenseShowList.filter((el) => true)));
        setFilter(fixedExpenseShowList.filter((el) => true));

        return;
      default:
        setChartEl(chartElement(fixedExpenseShowList.filter((el) => true)));
        setFilter(fixedExpenseShowList.filter((el) => true));

        return;
    }
  };

  const getChartFilter = (x) => {
    chartElFilter(x);
  };

  return (
    <ExternalComponent>
      <View style={styles.component}>
        <SummaryCost
          getChartFilter={getChartFilter}
          type="fixedExpense"
          list={chartEl}
        />
      </View>
      <View style={styles.chartCcomponent}>
        {chartEl.filter((el) => el.date.includes(fixedExpenseMonthFilter))
          .length > 0 ? (
          <Chart
            type="fixedExpense"
            press={() =>
              props.navigation.navigate("FixedExpensesList", {
                filter: filter,
              })
            }
            obj={chartEl}
          />
        ) : (
          <EmptyList />
        )}
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
              {delayCost} PLN{" "}
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
