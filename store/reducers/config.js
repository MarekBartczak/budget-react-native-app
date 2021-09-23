import {
  GET_SCHEME,
  ADD_INCOME_KEYBOARD_STATUS,
  TOGGLE_CUSTOM_THEME,
} from "../actions/config";

const initialState = {
  scheme: "light",
  customScheme: false,
  addIncomeKeyboardStatus: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEME:
      return { ...state, scheme: action.scheme };
    case ADD_INCOME_KEYBOARD_STATUS:
      return { ...state, addIncomeKeyboardStatus: action.status };
    case TOGGLE_CUSTOM_THEME:
      return { ...state, customScheme: action.status };
  }
  return state;
};
