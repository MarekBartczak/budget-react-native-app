import { ADD_COST } from "../actions/fixedExpense";
const initialState = {
  fixedExpense: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COST:
      return { ...state, fixedExpense: action.cost };
  }
  return state;
};
