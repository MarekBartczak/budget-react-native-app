import { SELECT_PLACE } from "../actions/favoritePlace";

const initialState = {
  favoritePlace: ["Biedronka", "Lidl", "Orlen", "Auchan", "Empik", "Castorama"],
  selected: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PLACE:
      return { ...state, selected: action.place };
  }
  return state;
};
