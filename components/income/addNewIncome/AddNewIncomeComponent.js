import { StyleSheet, Text, View } from "react-native";
import uuid from "react-native-uuid";
import AddNew from "../../addNew/AddNew";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as incomeAction from "../../../store/actions/income";
import Income from "../../../models/Income";
import switchComaToDot from "../../../functions/switchCompaToDot";
import validateChecker from "../../undefinedListCheck/ValidateChecker";
const AddNewIncomeComponent = (props) => {
  const [date, setDate] = useState(new Date());
  const [cost, setCost] = useState();
  const [title, setTitle] = useState();
  const [contractor, setContractor] = useState();

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
      dispatch(incomeAction.addIncome(newIncome()));
      cleanState();
    } else {
      alert("dane nie zostaly uzupelnione");
    }
  };

  const newelementProps = {
    title: "Nowy wpływ",
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
