export const IS_LOGIN = "IS_LOGIN";
export const isLogin = (loginStatus) => {
  return { type: IS_LOGIN, loginStatus: loginStatus };
};

export const LOGOUT = "LOGOUT";
export const logout = (status) => {
  return { type: LOGOUT, status: status };
};

export const SHOW_INDICATOR = "SHOW_INDICATOR";
export const showIndicator = (state) => {
  return { type: SHOW_INDICATOR, state: state };
};
export const SAVE_USER_DATA = "SAVE_USER_DATA";
export const saveUserData = (userData) => {
  return { type: SAVE_USER_DATA, userData: userData };
};
