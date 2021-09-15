import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";

import ExpenseHeader from "../../components/expense/expenseHeader/ExpenseHeader";
const ExpenseListScreen = (props) => {
  const items = useSelector((state) => state.item.items);
  //   console.log(items);
  return (
    <ExternalComponent>
      <View>
        <View>
          <ExpenseHeader />
        </View>
        <Text>LIST</Text>
      </View>
    </ExternalComponent>
  );
};

export default ExpenseListScreen;

const styles = StyleSheet.create({});
