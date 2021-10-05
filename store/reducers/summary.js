import { SET_EXPENSE, SET_INCOME, SET_FIXED_EXPENSE } from "../actions/summary";

const initialState = {
  expense: "",
  income: "",
  fixedExpense: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPENSE:
      return { ...state, expense: action.date };
    case SET_FIXED_EXPENSE:
      return { ...state, fixedExpense: action.date };
    case SET_INCOME:
      return { ...state, income: action.date };
  }
  return state;
};
