import { ADD_FIXED_INCOME, DELETE_FIXED_INCOME } from "../actions/fixedIncome";
import FixedIncome from "../../data/Dummy-FixedIncome";

const initialState = {
  fixedIncome: [...FixedIncome],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FIXED_INCOME:
      return { ...state, fixedIncome: [...state.fixedIncome, action.income] };
    case DELETE_FIXED_INCOME:
      if (state.fixedIncome.length > 0) {
        let current = [...state.fixedIncome];
        let removeItem = current.map((el) => el.id).indexOf(action.itemId);
        current.splice(removeItem, 1);
        return { ...state, fixedIncome: current };
      } else {
        return { ...state };
      }
  }

  return state;
};
