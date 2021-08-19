import {
  IS_LOGIN,
  LOGOUT,
  SHOW_INDICATOR,
  SAVE_USER_ID,
} from "../actions/auth";

const initialState = {
  isLogin: false,
  showIndicator: false,
  userID: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      return { ...state, isLogin: action.loginStatus };
    case LOGOUT:
      return { ...state, isLogin: action.status };
    case SHOW_INDICATOR:
      return { ...state, showIndicator: action.state };
    case SAVE_USER_ID:
      return { ...state, userID: action.id };
  }
  return state;
};
