export const ADD_COST = "ADD_COST";
export const addCost = (cost) => {
  return { type: ADD_COST, cost: cost };
};
export const IS_PAID = "IS_PAID";
export const isPaid = (stat, id, userId) => {
  return { type: IS_PAID, stat: stat, id: id, userId: userId };
};

export const ARCHIVE = "ARCHIVE";
export const archive = (id, userId) => {
  return { type: ARCHIVE, id: id, userId: userId };
};

export const DEL_EXPENSE = "DEL_EXPENSE";
export const delItem = (id, userId) => {
  return { type: DEL_EXPENSE, itemId: id, userId: userId };
};

export const LOADING_FIXED_EXPENSE_FROM_DB = "LOADING_FIXED_EXPENSE_FROM_DB";
export const loadingFixedExpensefromDB = (array) => {
  return { type: LOADING_FIXED_EXPENSE_FROM_DB, array: array };
};
export const LOADING_HISTORY_FROM_DB = "LOADING_HISTORY_FROM_DB";
export const loadingHistoryFromDb = (array, userId) => {
  return { type: LOADING_HISTORY_FROM_DB, array: array, userId: userId };
};
export const CLEAR_STATE_AFTER_LOGOUT = "CLEAR_STATE_AFTER_LOGOUT";
export const clearStateAfterLogout = () => {
  return { type: CLEAR_STATE_AFTER_LOGOUT };
};
export const DELAY_COST = "DELAY_COST";
export const delayCost = (cost) => {
  return { type: DELAY_COST, cost: cost };
};
