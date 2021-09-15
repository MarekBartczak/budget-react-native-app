import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";

import ExpenseHeader from "../../components/expense/expenseHeader/ExpenseHeader";
import ExpenseList from "../../components/expense/expenseList/ExpenseList";
import SummaryCost from "../../components/expense/SummaryCost";
const ExpenseListScreen = (props) => {
  const [cost, setCost] = useState(0);
  const items = useSelector((state) => state.item.items);
  const getCost = (cost) => {
    setTimeout(() => {
      setCost(cost);
    }, 200);
  };

  return (
    <ExternalComponent>
      <View>
        <View>
          <ExpenseHeader cost={cost} />
        </View>

        <View>
          <ExpenseList getCost={getCost} />
        </View>
      </View>
    </ExternalComponent>
  );
};

export default ExpenseListScreen;

const styles = StyleSheet.create({});
