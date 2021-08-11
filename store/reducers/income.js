import {
  ADD_INCOME,
  DELETE_INCOME,
  LOADING_INCOME_FROM_DB,
} from "../actions/income";
import Income from "../../data/Dummy-income";

const initialState = {
  // income: [...Income],
  income: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_INCOME_FROM_DB:
      return { ...state, income: [...action.array] };
    case ADD_INCOME:
      return { ...state, income: [...state.income, action.income] };
    case DELETE_INCOME:
      if (state.income.length > 0) {
        let current = [...state.income];
        let removeItem = current.map((el) => el.id).indexOf(action.itemId);
        current.splice(removeItem, 1);
        return { ...state, income: current };
      } else {
        return { ...state };
      }
  }
  return state;
};
