import {
  ADD_ITEM,
  DEL_ITEM,
  ADD_ITEM_TO_THE_RECEIPT,
  SET_RECEIPT_PLACE,
  SET_RECEIPT_DATE,
  ADD_ITEMS_FROM_RECEIPT,
  LOADING_EXPENSE_FROM_DB,
  CLEAR_STATE_AFTER_LOGOUT,
} from "../actions/items";
import Items from "../../data/dummy-data";
import deleteDataInCloud from "../../functions/cloud/deleteDataInCloud";

const initialState = {
  // items: [...Items],
  items: [],
  receipt: {
    place: "",
    date: "",
    items: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_EXPENSE_FROM_DB:
      return { ...state, items: [...action.array] };
    case DEL_ITEM:
      const filteredItem = state.items.find((el) => el.id === action.itemId);
      deleteDataInCloud.expense(filteredItem.firebaseId, action.userId);
      if (state.items.length > 0) {
        let current = [...state.items];
        let removeItem = current.map((el) => el.id).indexOf(action.itemId);
        current.splice(removeItem, 1);
        return { ...state, items: current };
      } else {
        return { ...state };
      }
    case ADD_ITEM_TO_THE_RECEIPT:
      return {
        ...state,
        receipt: {
          ...state.receipt,
          items: [...state.receipt.items, action.item],
        },
      };
    case SET_RECEIPT_DATE:
      return { ...state, receipt: { ...state.receipt, date: action.date } };
    case SET_RECEIPT_PLACE:
      return { ...state, receipt: { ...state.receipt, place: action.place } };
    case ADD_ITEMS_FROM_RECEIPT:
      console.log(action);

      return {
        ...state,
        items: [...state.items, ...action.list],
        receipt: { place: "", date: "", items: [] },
      };
    case CLEAR_STATE_AFTER_LOGOUT:
      return { ...state, items: [] };
  }
  return state;
};
