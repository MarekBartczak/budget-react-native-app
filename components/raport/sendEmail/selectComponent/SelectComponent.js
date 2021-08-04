import { StyleSheet, Text, View, Dimensions } from "react-native";
import Colors from "../../../../constants/Colors";
import SelectEl from "./SelectEl";
import React from "react";
import { useSelector } from "react-redux";
import * as raportActions from "../../../../store/actions/raport";
const SelectComponent = (props) => {
  const initialRaportState = useSelector((state) => state.raport);

  return (
    <View style={styles.select}>
      <Text style={styles.titleText}>Wybierz zawartość</Text>
      <SelectEl
        el={"Expense"}
        dateList={initialRaportState.Expense}
        name={"Wydatki"}
      />
      <SelectEl
        el={"FixedExpense"}
        dateList={initialRaportState.FixedExpense}
        name={"Stałe wydatki"}
      />
      <SelectEl
        el={"Income"}
        dateList={initialRaportState.Income}
        name={"Wpływy"}
      />
      <SelectEl
        el={"FixedIncome"}
        dateList={initialRaportState.FixedIncome}
        name={"Stałe wpływy"}
      />
    </View>
  );
};

export default SelectComponent;

const styles = StyleSheet.create({
  select: {
    width: Dimensions.get("window").width * 0.9,
  },
  titleText: {
    textAlign: "center",
    fontSize: 15,
  },
});
