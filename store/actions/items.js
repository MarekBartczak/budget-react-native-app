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

export const ADD_ITEMS_FROM_RECEIPT = "ADD_ITEMS_FROM_RECEIPT";
export const addItemsFromReceipt = (list) => {
  return { type: ADD_ITEMS_FROM_RECEIPT, list: list };
};
