export const GET_SCHEME = "GET_SCHEME";
export const getScheme = (scheme) => {
  return { type: GET_SCHEME, scheme: scheme };
};
export const ADD_INCOME_KEYBOARD_STATUS = "ADD_INCOME_KEYBOARD_STATUS";
export const addIncomeKeyboardStatus = (status) => {
  return { type: ADD_INCOME_KEYBOARD_STATUS, status: status };
};
