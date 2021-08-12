export const IS_LOGIN = "IS_LOGIN";
export const isLogin = (loginStatus) => {
  return { type: IS_LOGIN, loginStatus: loginStatus };
};

export const LOGOUT = "LOGOUT";
export const logout = (status) => {
  return { type: LOGOUT, status: status };
};
