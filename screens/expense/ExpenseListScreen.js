import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";

import ExpenseHeader from "../../components/expense/expenseHeader/ExpenseHeader";
import ExpenseList from "../../components/expense/expenseList/ExpenseList";
import * as expenseActions from "../../store/actions/items";
const ExpenseListScreen = (props) => {
  const dispatch = useDispatch();
  const [cost, setCost] = useState(0);
  const [listLength, setListLength] = useState(0);
  const getCost = (cost) => {
    setTimeout(() => {
      setCost(cost);
    }, 200);
  };
  const getListLength = (len) => {
    setTimeout(() => {
      setListLength(len);
    }, 200);
  };

  useEffect(() => {
    dispatch(expenseActions.CountFilteredItemsAndSummaryCost(listLength, cost));
  }, [cost, listLength]);

  return (
    <ExternalComponent>
      <View>
        <View>
          <ExpenseHeader cost={cost} />
        </View>

        <View>
          <ExpenseList getCost={getCost} getListLength={getListLength} />
        </View>
      </View>
    </ExternalComponent>
  );
};

export default ExpenseListScreen;

const styles = StyleSheet.create({});
