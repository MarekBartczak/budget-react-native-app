export const ADD_ITEM = "ADD_ITEM";
export const addItem = (item) => {
  return { type: ADD_ITEM, item: item };
};

export const DEL_ITEM = "DEL_ITEM";
export const delItem = (id) => {
  return { type: DEL_ITEM, itemId: id };
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
