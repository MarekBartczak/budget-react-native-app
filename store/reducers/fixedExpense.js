import { ADD_COST } from "../actions/fixedExpense";
import Expense from "../../data/Dummy-FixedExpense";
const initialState = {
  fixedExpense: [...Expense],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COST:
      return { ...state, fixedExpense: [...state.fixedExpense, action.cost] };
  }
  return state;
};
