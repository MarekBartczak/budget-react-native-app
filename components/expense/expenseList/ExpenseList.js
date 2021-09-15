import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import ExpenseListElement from "./ExpenseListElement";
const ExpenseList = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const filter = useSelector((state) => state.item.filter.selectedFilter);
  const items = useSelector((state) => state.item.items);
  //   console.log(items);
  return (
    <View style={{ ...styles.expenseList, ...{} }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
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
