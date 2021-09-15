import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import ExpenseListElement from "./ExpenseListElement";
const ExpenseList = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const filter = useSelector((state) => state.item.filter.selectedFilter);
  const items = useSelector((state) => state.item.items);

  const summary = (list) => {
    const countSum = (total, sum) => total + sum;
    const costList = list.map((el) => el.cost);
    return costList.reduce(countSum);
  };
  props.getCost(summary(items));
  return (
    <View style={{ ...styles.expenseList, ...{ flex: 1 } }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: Dimensions.get("window").height * 0.2 }}
        renderItem={(item) => (
          <ExpenseListElement
            cost={item.item.cost}
            date={item.item.date}
            mainCategory={item.item.mainCategory}
            place={item.item.place}
            subCategory={item.item.subCategory}
            id={item.item.id}
          />
        )}
      />
    </View>
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  expenseList: {},
});
