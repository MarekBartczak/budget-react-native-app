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
