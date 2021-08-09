import React, { useState } from "react";
import uuid from "react-native-uuid";
import Expense from "../../../models/Expense";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";
import { useDispatch } from "react-redux";
import switchComaToDot from "../../../functions/switchCompaToDot";
import AddNew from "../../addNew/AddNew";
import validateChecker from "../../undefinedListCheck/ValidateChecker";
const AddNewFixedExpenseComponent = (props) => {
  // const [date, setDate] = useState(new Date());
  // const [cost, setCost] = useState();
  // const [title, setTitle] = useState();
  // const [recipient, setRecipient] = useState();

  // const dispatch = useDispatch();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
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
    placeHolderAmount: "Kwota",
    placeHolderName: "Nazwa",
    placeHolderContractor: "Odbiorca",
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
