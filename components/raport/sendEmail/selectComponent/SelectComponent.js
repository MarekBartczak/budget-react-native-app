import { StyleSheet, Text, View, Dimensions } from "react-native";
import Colors from "../../../../constants/Colors";
import SelectEl from "./SelectEl";
import React from "react";
import { useSelector } from "react-redux";
import * as raportActions from "../../../../store/actions/raport";
import Send from "../email/send";

const SelectComponent = (props) => {
  const initialRaportState = useSelector((state) => state.raport);

  return (
    <View>
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
      <View style={styles.send}>
        <Send />
      </View>
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
  send: {
    marginTop: 40,
    alignItems: "center",
  },
});
