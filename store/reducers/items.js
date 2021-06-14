import { ADD_ITEM, DEL_ITEM } from "../actions/items";

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.item] };

    case DEL_ITEM:
      if (state.items.length > 0) {
        let current = [...state.items];
        let removeItem = current.map((el) => el.id).indexOf(action.itemId);
        current.splice(removeItem, 1);
        return { ...state, items: current };
      } else {
        return { ...state };
      }
  }
  return state;
};
