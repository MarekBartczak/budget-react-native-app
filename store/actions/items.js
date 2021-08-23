export const DEL_ITEM = "DEL_ITEM";
export const delItem = (id, userId) => {
  return { type: DEL_ITEM, itemId: id, userId: userId };
};

export const ADD_ITEM_TO_THE_RECEIPT = "ADD_ITEM_TO_THE_RECEIPT";
export const addItemToTheReceipt = (item) => {
  return { type: ADD_ITEM_TO_THE_RECEIPT, item: item };
};

export const SET_RECEIPT_DATE = "SET_RECEIPT_DATE";
export const setReceiptDate = (date) => {
  return { type: SET_RECEIPT_DATE, date: date };
};

export const SET_RECEIPT_PLACE = "SET_RECEIPT_PLACE";
export const setReceiptPlace = (place) => {
  return { type: SET_RECEIPT_PLACE, place: place };
};

export const ADD_ITEMS_FROM_RECEIPT = "ADD_ITEMS_FROM_RECEIPT";
export const addItemsFromReceipt = (list) => {
  return { type: ADD_ITEMS_FROM_RECEIPT, list: list };
};

export const LOADING_EXPENSE_FROM_DB = "LOADING_EXPENSE_FROM_DB";
export const loadingExpensefromDB = (array) => {
  return { type: LOADING_EXPENSE_FROM_DB, array: array };
};
export const CLEAR_STATE_AFTER_LOGOUT = "CLEAR_STATE_AFTER_LOGOUT";
export const clearStateAfterLogout = () => {
  return { type: CLEAR_STATE_AFTER_LOGOUT };
};
