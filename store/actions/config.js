export const GET_SCHEME = "GET_SCHEME";
export const getScheme = (scheme) => {
  return { type: GET_SCHEME, scheme: scheme };
};
export const ADD_INCOME_KEYBOARD_STATUS = "ADD_INCOME_KEYBOARD_STATUS";
export const addIncomeKeyboardStatus = (status) => {
  return { type: ADD_INCOME_KEYBOARD_STATUS, status: status };
};

export const TOGGLE_CUSTOM_THEME = "TOGGLE_CUSTOM_THEME";
export const toggleCustomTheme = (status) => {
  return { type: TOGGLE_CUSTOM_THEME, status: status };
};
export const TOGGLE_DANGER_ZONE = "TOGGLE_DANGER_ZONE";
export const toggleDangerZone = (status) => {
  return { type: TOGGLE_DANGER_ZONE, status: status };
};
export const TOGGLE_DELETE_ACCOUNT = "TOGGLE_DELETE_ACCOUNT";
export const toggleDeleteAccount = (status) => {
  return { type: TOGGLE_DELETE_ACCOUNT, status: status };
};
