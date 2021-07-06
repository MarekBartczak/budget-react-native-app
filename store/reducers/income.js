import { ADD_INCOME } from "../actions/income";
import Income from "../../data/Dummy-income";

const initialState = {
  income: [...Income],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_INCOME:
      return { ...state, income: [...state.income, action.income] };
  }
  return state;
};
