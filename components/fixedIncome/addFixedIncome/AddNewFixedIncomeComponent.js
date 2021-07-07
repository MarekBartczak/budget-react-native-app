import React, { useState } from "react";
import uuid from "react-native-uuid";
import switchComaToDot from "../../../functions/switchCompaToDot";
import AddNewPeriodicElement from "../../addNewPeriodicElement/AddNewPeriodicElement";
import validateChecker from "../../addNewPeriodicElement/ValidateChecker";
import Income from "../../../models/Income";
import * as fixedIncomeAction from "../../../store/actions/fixedIncome";
import { useDispatch } from "react-redux";
const AddNewFixedIncomeComponent = (props) => {
  const [date, setDate] = useState(new Date());
  const [cost, setCost] = useState();
  const [title, setTitle] = useState();
  const [contractor, setContractor] = useState();

  const dispatch = useDispatch();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const newFixedIncome = () => {
    return new Income(
      uuid.v4(),
      date.toISOString().slice(0, 10),
      title,
      contractor,
      Number(switchComaToDot(cost))
    );
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
      dispatch(fixedIncomeAction.addFixedIncome(newFixedIncome()));
      cleanState();
    } else {
      alert("dane nie zostaly uzupelnione");
    }
  };

  const perdiodicElementProps = {
    title: "Nowy stały wpływ",
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

  return <AddNewPeriodicElement {...perdiodicElementProps} />;
};

export default AddNewFixedIncomeComponent;
