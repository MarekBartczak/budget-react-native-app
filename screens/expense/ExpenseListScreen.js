import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";

import ExpenseHeader from "../../components/expense/expenseHeader/ExpenseHeader";
import ExpenseList from "../../components/expense/expenseList/ExpenseList";
const ExpenseListScreen = (props) => {
  const items = useSelector((state) => state.item.items);
  //   console.log(items);
  return (
    <ExternalComponent>
      <View>
        <View>
          <ExpenseHeader />
        </View>
        <View>
          <ExpenseList />
        </View>
      </View>
    </ExternalComponent>
  );
};

export default ExpenseListScreen;

const styles = StyleSheet.create({});
