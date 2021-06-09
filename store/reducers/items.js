import { ADD_ITEM } from "../actions/items";

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      console.log(state);
      return { ...state, items: [...state.items, action.item] };
  }
  return state;
};
