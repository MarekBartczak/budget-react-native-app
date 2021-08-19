import {
  IS_LOGIN,
  LOGOUT,
  SHOW_INDICATOR,
  SAVE_USER_DATA,
} from "../actions/auth";

const initialState = {
  isLogin: false,
  showIndicator: false,
  userID: "",
  userName: "",
  userEmail: "",
  userPhotoUrl: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      return { ...state, isLogin: action.loginStatus };
    case LOGOUT:
      return { ...state, isLogin: action.status };
    case SHOW_INDICATOR:
      return { ...state, showIndicator: action.state };
    case SAVE_USER_DATA:
      const userData = action.userData;
      return {
        ...state,
        userID: userData.id,
        userName: userData.name,
        userEmail: userData.email,
        userPhotoUrl: userData.photoURL,
      };
  }
  return state;
};
