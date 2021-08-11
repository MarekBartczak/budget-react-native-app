export const ADD_INCOME = "ADD_INCOME";

export const addIncome = (income) => {
  return { type: ADD_INCOME, income: income };
};

export const DELETE_INCOME = "DELETE_INCOME";
export const delItem = (id) => {
  return { type: DELETE_INCOME, itemId: id };
};

export const LOADING_INCOME_FROM_DB = "LOADING_INCOME_FROM_DB";
export const loadingIncomefromDB = (array) => {
  return { type: LOADING_INCOME_FROM_DB, array: array };
};
