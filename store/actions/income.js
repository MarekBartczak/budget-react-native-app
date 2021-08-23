export const ADD_INCOME = "ADD_INCOME";

export const addIncome = (income) => {
  return { type: ADD_INCOME, income: income };
};

export const DELETE_INCOME = "DELETE_INCOME";
export const delItem = (id, userId) => {
  return { type: DELETE_INCOME, itemId: id, userId: userId };
};

export const LOADING_INCOME_FROM_DB = "LOADING_INCOME_FROM_DB";
export const loadingIncomefromDB = (array) => {
  return { type: LOADING_INCOME_FROM_DB, array: array };
};
export const CLEAR_STATE_AFTER_LOGOUT = "CLEAR_STATE_AFTER_LOGOUT";
export const clearStateAfterLogout = () => {
  return { type: CLEAR_STATE_AFTER_LOGOUT };
};
