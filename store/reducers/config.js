import {
  GET_SCHEME,
  ADD_INCOME_KEYBOARD_STATUS,
  TOGGLE_CUSTOM_THEME,
  TOGGLE_DANGER_ZONE,
  TOGGLE_DELETE_ACCOUNT,
} from "../actions/config";

const initialState = {
  isLoaded: false,

  scheme: "light",
  customScheme: false,
  addIncomeKeyboardStatus: false,
  toogleDangerZone: false,
  deleteAccount: false,
  language: "en",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEME:
      return { ...state, scheme: action.scheme, isLoaded: true };
    case ADD_INCOME_KEYBOARD_STATUS:
      return { ...state, addIncomeKeyboardStatus: action.status };
    case TOGGLE_CUSTOM_THEME:
      return { ...state, customScheme: action.status };
    case TOGGLE_DANGER_ZONE:
      return { ...state, toogleDangerZone: action.status };
    case TOGGLE_DELETE_ACCOUNT:
      return { ...state, deleteAccount: action.status };
  }
  return state;
};
