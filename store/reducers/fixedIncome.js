import {
  ADD_FIXED_INCOME,
  DELETE_FIXED_INCOME,
  LOADING_FIXED_INCOME_FROM_DB,
  CLEAR_STATE_AFTER_LOGOUT,
} from "../actions/fixedIncome";
import FixedIncome from "../../data/Dummy-FixedIncome";
import deleteDataInCloud from "../../functions/cloud/deleteDataInCloud";

const initialState = {
  // fixedIncome: [...FixedIncome],
  fixedIncome: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_FIXED_INCOME_FROM_DB:
      return { ...state, fixedIncome: [...action.array] };
    case ADD_FIXED_INCOME:
      return { ...state, fixedIncome: [...state.fixedIncome, action.income] };
    case DELETE_FIXED_INCOME:
      const filteredItem = state.fixedIncome.find(
        (el) => el.id === action.itemId
      );
      deleteDataInCloud.fixedIncome(filteredItem.firebaseId, action.userId);

      if (state.fixedIncome.length > 0) {
        let current = [...state.fixedIncome];
        let removeItem = current.map((el) => el.id).indexOf(action.itemId);
        current.splice(removeItem, 1);

        return { ...state, fixedIncome: current };
      } else {
        return { ...state };
      }
    case CLEAR_STATE_AFTER_LOGOUT:
      return { ...state, fixedIncome: [] };
  }

  return state;
};
