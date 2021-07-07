import { ADD_FIXED_INCOME } from "../actions/fixedIncome";
import FixedIncome from "../../data/Dummy-FixedIncome";

const initialState = {
  fixedIncome: [...FixedIncome],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FIXED_INCOME:
      return { ...state, fixedIncome: [...state.fixedIncome, action.income] };
  }
  return state;
};
