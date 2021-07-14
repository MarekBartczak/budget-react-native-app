import { ADD_COST, IS_PAID, ARCHIVE } from "../actions/fixedExpense";
import Expense from "../../data/Dummy-FixedExpense";
import uuid from "react-native-uuid";
import setNextPayDay from "../../functions/SetNextPayDay";
const initialState = {
  fixedExpense: [...Expense],
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COST:
      return { ...state, fixedExpense: [...state.fixedExpense, action.cost] };
    case IS_PAID:
      let newState = [...state.fixedExpense];
      newState.map((el) =>
        el.id === action.id ? (el.isPaid = action.stat) : null
      );
      return { ...state, fixedExpense: [...newState] };

    case ARCHIVE:
      let newStateToArchive = [...state.fixedExpense];
      let newEl = { ...newStateToArchive.find((el) => el.id === action.id) };
      let updateEl = { ...newStateToArchive.find((el) => el.id === action.id) };
      let updateState = [...state.fixedExpense];
      newEl.id = uuid.v4();
      newEl.paidDate = new Date().toISOString().slice(0, 10);
      newEl.originId = action.id;
      updateEl.isPaid = false;
      updateEl.date = setNextPayDay(newEl.date, newEl.interval);

      const index = updateState.findIndex((el) => el.id === action.id);
      updateState[index] = updateEl;

      return {
        ...state,
        fixedExpense: updateState,
        history: [...state.history, newEl],
      };
  }
  return state;
};
