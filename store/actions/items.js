export const ADD_ITEM = "ADD_ITEM";

export const addItem = (item) => {
  return { type: ADD_ITEM, item: item };
};

export const DEL_ITEM = "DEL_ITEM";

export const delItem = (id) => {
  return { type: DEL_ITEM, itemId: id };
};

export const ADD_ITEM_TO_THE_RECIPT = "ADD_ITEM_TO_THE_RECIPT";

export const addItemToTheRecipt = (item) => {
  return { type: ADD_ITEM_TO_THE_RECIPT, item: item };
};
