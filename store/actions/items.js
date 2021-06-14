export const ADD_ITEM = "ADD_ITEM";

export const addItem = (item) => {
  return { type: ADD_ITEM, item: item };
};

export const DEL_ITEM = "DEL_ITEM";

export const delItem = (id) => {
  return { type: DEL_ITEM, itemId: id };
};
