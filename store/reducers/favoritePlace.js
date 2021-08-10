import {
  SELECT_PLACE,
  EDIT_PLACE,
  SELECT_LOGO,
} from "../actions/favoritePlace";
import favoritePlace from "../../data/Dummy-FavPlace";
import favoritePlaceEmpty from "../../data/Dummy-FavPlaceEmpty";

const data = { lidl: "www.lidl.de" };

const initialState = {
  // favoritePlace: [...favoritePlace],
  favoritePlace: [...favoritePlaceEmpty],
  selected: "",
  toSearchIn: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PLACE:
      return { ...state, selected: action.place };
    case SELECT_LOGO:
      return { ...state, selectedLogo: action.logo };
    case EDIT_PLACE:
      const newState = [...state.favoritePlace];
      const isName = (placeName) => placeName.name === state.selected;
      const index = newState.indexOf(newState.find(isName));

      newState[index].name = action.place;
      newState[index].logo = action.logo;

      return { ...state, favoritePlace: [...newState] };
  }

  return state;
};
