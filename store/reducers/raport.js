import {
  INITIAL_RAPORT_STATE,
  IS_SELECTED_TYPE,
  IS_SELECTED_DATE,
  TOOGLE_DEFAULT_EMAIL,
  SET_EMAIL,
  TOOGLE_MONTHLY_RAPORT,
  UPDATE_DEFAULT_EMAIL,
} from "../actions/raport";

const initialState = {
  diffrentEmail: false,
  updateDefaultEmail: false,
  sendRaportEveryMonth: false,
  raportWasSentInCurrentMonth: false,
  email: "",
  raportToSend: 5,
};

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
    case TOOGLE_DEFAULT_EMAIL:
      return { ...state, diffrentEmail: action.status };
    case SET_EMAIL:
      return { ...state, email: action.email };
    case UPDATE_DEFAULT_EMAIL:
      return { ...state, updateDefaultEmail: action.status };
    case TOOGLE_MONTHLY_RAPORT:
      return { ...state, sendRaportEveryMonth: action.status };
  }
  return state;
};
