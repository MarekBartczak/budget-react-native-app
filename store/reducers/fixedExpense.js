import {
  ADD_COST,
  IS_PAID,
  ARCHIVE,
  DEL_EXPENSE,
  LOADING_FIXED_EXPENSE_FROM_DB,
  LOADING_HISTORY_FROM_DB,
  CLEAR_STATE_AFTER_LOGOUT,
  DELAY_COST,
} from "../actions/fixedExpense";
import uuid from "react-native-uuid";
import setNextPayDay from "../../functions/SetNextPayDay";
import deleteDataInCloud from "../../functions/cloud/deleteDataInCloud";
import updateHistory from "../../functions/cloud/updateHistory";
const initialState = {
  fixedExpense: [],
  delayCost: 0,
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_FIXED_EXPENSE_FROM_DB:
      return { ...state, fixedExpense: [...action.array] };
    case LOADING_HISTORY_FROM_DB:
      return { ...state, history: [...action.array] };
    case ADD_COST:
      return { ...state, fixedExpense: [...state.fixedExpense, action.cost] };
    case IS_PAID:
      let newState = [...state.fixedExpense];
      newState.map((el) =>
        el.id === action.id ? (el.isPaid = action.stat) : null
      );
      return { ...state, fixedExpense: [...newState] };

    case ARCHIVE:
      const id = action.id;
      let element = [...state.fixedExpense.filter((el) => el.id === id)][0];
      const currentDate = new Date().toISOString().slice(0, 10);

      const historyElement = {
        wasPaidIn: currentDate,
      };

      const interval = element.interval;
      if (!element.history) {
        element.history = [];
      }

      let date = new Date(element.date);

      if (interval.months > 0) {
        date = date.setMonth(date.getMonth() + interval.months);
      }
      if (interval.days > 0) {
        date = date.setDate(date.getDate() + interval.days);
      }
      if (interval.years > 0) {
        date = date.setFullYear(date.getFullYear() + interval.years);
      }

      element.date = new Date(date).toISOString().slice(0, 10);

      element.history.push(historyElement);
      updateHistory(element, action.userId);
      return { ...state };
    case DELAY_COST:
      return { ...state, delayCost: action.cost };
    case DEL_EXPENSE:
      const filteredItem = state.fixedExpense.find(
        (el) => el.id === action.itemId
      );
      deleteDataInCloud.fixedExpense(filteredItem.firebaseId, action.userId);

      if (state.fixedExpense.length > 0) {
        let current = [...state.fixedExpense];
        let removeItem = current.map((el) => el.id).indexOf(action.itemId);
        current.splice(removeItem, 1);
        return { ...state, fixedExpense: current };
      } else {
        return { ...state };
      }
    case CLEAR_STATE_AFTER_LOGOUT:
      return { ...state, fixedExpense: [] };
  }
  return state;
};
