export const INITIAL_RAPORT_STATE = "INITIAL_RAPORT_STATE";
export const initialRaportState = (obj) => {
  return { type: INITIAL_RAPORT_STATE, obj: obj };
};

export const IS_SELECTED_TYPE = "IS_SELECTED_TYPE";
export const isSelectedType = (isSelected, el) => {
  return { type: IS_SELECTED_TYPE, isSelected: isSelected, el: el };
};

export const IS_SELECTED_DATE = "IS_SELECTED_DATE";
export const isSelectedDate = (date, el, isSelected) => {
  return {
    type: IS_SELECTED_DATE,
    date: date,
    el: el,
    isSelected: isSelected,
  };
};

export const TOOGLE_DEFAULT_EMAIL = "TOOGLE_DEFAULT_EMAIL";
export const toggleDefaultEmail = (status) => {
  return { type: TOOGLE_DEFAULT_EMAIL, status: status };
};
export const TOOGLE_MONTHLY_RAPORT = "TOOGLE_MONTHLY_RAPORT";
export const toggleMonthlyRaport = (status) => {
  return { type: TOOGLE_MONTHLY_RAPORT, status: status };
};

export const SET_EMAIL = "SET_EMAIL";
export const setEmail = (email) => {
  return { type: SET_EMAIL, email: email };
};

// export const SET_SELECTED_DATE = "SET_SELECTED_DATE";
// export const setSelectedDate = (obj) => {
//   return { type: SET_SELECTED_DATE, obj: obj };
// };

// export const DELETE_TYPE = "DELETE_TYPE";
// export const deleteType = (deleteType) => {
//   return { type: DELETE_TYPE, deleteType: deleteType };
// };
