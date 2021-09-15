import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
const ExpenseFilter = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const filterType = useSelector((state) => state.item.filter.filterType);

  return (
    <View>
      <Text>Filtry: data: "", kategoria: "", miejsce: "" </Text>
      <Text>{filterType}</Text>
    </View>
  );
};

export default ExpenseFilter;

const styles = StyleSheet.create({});
