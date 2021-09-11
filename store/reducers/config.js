import { GET_SCHEME, ADD_INCOME_KEYBOARD_STATUS } from "../actions/config";

const initialState = {
  scheme: "light",
  addIncomeKeyboardStatus: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEME:
      return { ...state, scheme: action.scheme };
    case ADD_INCOME_KEYBOARD_STATUS:
      return { ...state, addIncomeKeyboardStatus: action.status };
  }
  return state;
};
