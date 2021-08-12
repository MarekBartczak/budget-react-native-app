import { IS_LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
  isLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      return { ...state, isLogin: action.loginStatus };
    case LOGOUT:
      return { ...state, isLogin: action.status };
  }
  return state;
};
