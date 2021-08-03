import { SET_DATE_OBJ } from "../actions/raport";

const initialState = {
  dateObj: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE_OBJ:
      return { ...state, dateObj: { ...action.obj } };
  }
  return state;
};
