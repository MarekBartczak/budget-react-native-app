import {
  ADD_INCOME,
  DELETE_INCOME,
  LOADING_INCOME_FROM_DB,
} from "../actions/income";
import Income from "../../data/Dummy-income";
import deleteDataInCloud from "../../functions/cloud/deleteDataInCloud";

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
      const filteredItem = state.income.find((el) => el.id === action.itemId);
      deleteDataInCloud.income(filteredItem.firebaseId, action.userId);

      if (state.income.length > 0) {
        let current = [...state.income];
        let removeItem = current.map((el) => el.id).indexOf(action.itemId);
        current.splice(removeItem, 1);
        // deleteDataInCloud.income({ ...state, income: current }.income);
        return { ...state, income: current };
      } else {
        return { ...state };
      }
  }
  return state;
};
