import { StyleSheet, Text, View, useColorScheme } from "react-native";
import uuid from "react-native-uuid";
import AddNew from "../../addNew/AddNew";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as incomeAction from "../../../store/actions/income";
import Income from "../../../models/income";
import switchComaToDot from "../../../functions/switchCompaToDot";
import validateChecker from "../../undefinedListCheck/ValidateChecker";
import saveDataToTheCloud from "../../../functions/cloud/saveDataToTheCloud";
const AddNewIncomeComponent = (props) => {
  const listOfIncome = useSelector((state) => state.income.income);
  const [date, setDate] = useState(new Date());
  const [cost, setCost] = useState();
  const [title, setTitle] = useState();
  const [contractor, setContractor] = useState();
  const userId = useSelector((state) => state.auth.userID);

  const dispatch = useDispatch();

  const newIncome = () => {
    return new Income(
      uuid.v4(),
      date.toISOString().slice(0, 10),
      title,
      contractor,
      Number(switchComaToDot(cost))
    );
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const cleanState = () => {
    setDate(new Date());
    setCost();
    setTitle();
    setContractor();
  };

  const saveFixedIncome = () => {
    const list = [title, cost, contractor];
    if (validateChecker(list)) {
      const obj = newIncome();
      dispatch(incomeAction.addIncome(obj));
      saveDataToTheCloud.income(obj, userId);
      cleanState();
    } else {
      alert("dane nie zostaly uzupelnione");
    }
  };

  const newelementProps = {
    placeHolderAmount: "Kwota",
    placeHolderName: "Nazwa",
    placeHolderContractor: "kontrahent",
    amountValue: cost,
    setAmountValue: setCost,
    nameValue: title,
    setNameValue: setTitle,
    contractor: contractor,
    setContractor: setContractor,
    date: date,
    onChangeDate: onChangeDate,
    save: () => {
      saveFixedIncome();
    },
  };

  return <AddNew {...newelementProps} />;
};

export default AddNewIncomeComponent;

const styles = StyleSheet.create({});
