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
import { dataLang, selectLang } from "../../../lang/lang";
const AddNewIncomeComponent = (props) => {
  const listOfIncome = useSelector((state) => state.income.income);
  const [date, setDate] = useState(new Date());
  const [cost, setCost] = useState();
  const [title, setTitle] = useState();
  const [contractor, setContractor] = useState();
  const userId = useSelector((state) => state.auth.userID);
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
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

  const saveIncome = () => {
    const list = [title, cost, contractor];
    if (validateChecker(list)) {
      const obj = newIncome();
      dispatch(incomeAction.addIncome(obj));
      saveDataToTheCloud.income(obj, userId);
      cleanState();
    } else {
      alert(translate("proszę uzupełnić formularz"));
    }
  };

  const newelementProps = {
    placeHolderAmount: translate("Kwota"),
    placeHolderName: translate("Nazwa"),
    placeHolderContractor: translate("Kontrahent"),
    amountValue: cost,
    setAmountValue: setCost,
    nameValue: title,
    setNameValue: setTitle,
    contractor: contractor,
    setContractor: setContractor,
    date: date,
    onChangeDate: onChangeDate,
    save: () => {
      saveIncome();
    },
  };

  return <AddNew {...newelementProps} />;
};

export default AddNewIncomeComponent;

const styles = StyleSheet.create({});
