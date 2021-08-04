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

// export const SET_SELECTED_DATE = "SET_SELECTED_DATE";
// export const setSelectedDate = (obj) => {
//   return { type: SET_SELECTED_DATE, obj: obj };
// };

// export const DELETE_TYPE = "DELETE_TYPE";
// export const deleteType = (deleteType) => {
//   return { type: DELETE_TYPE, deleteType: deleteType };
// };
