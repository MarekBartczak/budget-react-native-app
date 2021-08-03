import { StyleSheet, Text, View, Dimensions } from "react-native";
import Colors from "../../../../constants/Colors";
import SelectEl from "./SelectEl";
import React from "react";
import { useSelector } from "react-redux";
const SelectComponent = (props) => {
  const dateList = useSelector((state) => state.raport.dateObj);

  return (
    <View style={styles.select}>
      <Text style={styles.titleText}>Wybierz zawartość</Text>
      <SelectEl el={"Expense"} dateList={dateList.Expense} name={"Wydatki"} />
      <SelectEl
        el={"FixedExpense"}
        dateList={dateList.FixedExpense}
        name={"Stałe wydatki"}
      />
      <SelectEl el={"Income"} dateList={dateList.Income} name={"Wpływy"} />
      <SelectEl
        el={"FixedIncome"}
        dateList={dateList.FixedIncome}
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
