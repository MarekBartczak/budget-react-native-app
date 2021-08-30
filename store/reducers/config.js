import { GET_SCHEME } from "../actions/config";

const initialState = {
  scheme: "light",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEME:
      return { ...state, scheme: action.scheme };
  }
  return state;
};
