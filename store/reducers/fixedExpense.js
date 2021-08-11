import {
  ADD_COST,
  IS_PAID,
  ARCHIVE,
  DEL_EXPENSE,
  LOADING_FIXED_EXPENSE_FROM_DB,
} from "../actions/fixedExpense";
import Expense from "../../data/Dummy-FixedExpense";
import uuid from "react-native-uuid";
import setNextPayDay from "../../functions/SetNextPayDay";
const initialState = {
  // fixedExpense: [...Expense],
  fixedExpense: [],
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_FIXED_EXPENSE_FROM_DB:
      return { ...state, fixedExpense: [...action.array] };
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
    case DEL_EXPENSE:
      if (state.fixedExpense.length > 0) {
        let current = [...state.fixedExpense];
        let removeItem = current.map((el) => el.id).indexOf(action.itemId);
        current.splice(removeItem, 1);
        return { ...state, fixedExpense: current };
      } else {
        return { ...state };
      }
  }
  return state;
};
