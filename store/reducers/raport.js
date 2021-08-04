import {
  INITIAL_RAPORT_STATE,
  IS_SELECTED_TYPE,
  IS_SELECTED_DATE,
} from "../actions/raport";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_RAPORT_STATE:
      return { ...state, ...action.obj };

    case IS_SELECTED_TYPE:
      const newState = { ...state };
      newState[action.el].isSelected = action.isSelected;
      return { ...state, ...newState };

    case IS_SELECTED_DATE:
      const newDateState = { ...state };
      let dateObj = newDateState[action.el].dateList[0];
      const filtered = dateObj.find((el) => el.date === action.date);
      const index = dateObj.indexOf(filtered);
      dateObj[index].isSelected = action.isSelected;
      return { ...state };
  }
  return state;
};
