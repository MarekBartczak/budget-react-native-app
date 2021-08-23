export const ADD_FIXED_INCOME = "ADD_FIXED_INCOME";

export const addFixedIncome = (income) => {
  return { type: ADD_FIXED_INCOME, income: income };
};

export const DELETE_FIXED_INCOME = "DELETE_FIXED_INCOME";
export const delItem = (id, userId) => {
  return { type: DELETE_FIXED_INCOME, itemId: id, userId: userId };
};

export const LOADING_FIXED_INCOME_FROM_DB = "LOADING_FIXED_INCOME_FROM_DB";
export const loadingFixedIncomefromDB = (array) => {
  return { type: LOADING_FIXED_INCOME_FROM_DB, array: array };
};
export const CLEAR_STATE_AFTER_LOGOUT = "CLEAR_STATE_AFTER_LOGOUT";
export const clearStateAfterLogout = () => {
  return { type: CLEAR_STATE_AFTER_LOGOUT };
};
