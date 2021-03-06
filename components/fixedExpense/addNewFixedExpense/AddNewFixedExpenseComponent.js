import React, { useState } from "react";
import uuid from "react-native-uuid";
import Expense from "../../../models/expense";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";
import { useDispatch } from "react-redux";
import switchComaToDot from "../../../functions/switchCompaToDot";
import AddNew from "../../addNew/AddNew";
import validateChecker from "../../undefinedListCheck/ValidateChecker";
import { dataLang, selectLang } from "../../../lang/lang";
const AddNewFixedExpenseComponent = (props) => {
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };

  const newFixedExpense = () => {
    return new Expense(
      uuid.v4(),
      date.toISOString().slice(0, 10),
      title,
      recipient,
      Number(switchComaToDot(cost))
    );
  };

  const cleanState = () => {
    setDate(new Date());
    setCost();
    setTitle();
    setRecipient();
  };

  const saveFixedExpense = () => {
    const list = [title, cost, recipient];
    if (validateChecker(list)) {
      dispatch(fixedExpenseActions.addCost(newFixedExpense()));
      cleanState();
    } else {
      alert("dane nie zostaly uzupelnione");
    }
  };

  const perdiodicElementProps = {
    title: "Nowy stały wydatek",
    placeHolderAmount: translate("Kwota"),
    placeHolderName: translate("Nazwa"),
    placeHolderContractor: translate("Kontrahent"),
    amountValue: cost,
    setAmountValue: setCost,
    nameValue: title,
    setNameValue: setTitle,
    contractor: recipient,
    setContractor: setRecipient,
    date: date,
    onChangeDate: onChangeDate,
    save: () => {
      saveFixedExpense();
    },
  };

  return <AddNew {...perdiodicElementProps} />;
};

export default AddNewFixedExpenseComponent;
