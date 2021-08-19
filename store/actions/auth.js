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
export const SAVE_USER_ID = "SAVE_USER_ID";
export const saveUserId = (id) => {
  return { type: SAVE_USER_ID, id: id };
};
