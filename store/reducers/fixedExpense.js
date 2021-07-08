import { ADD_COST, IS_PAID, ARCHIVE } from "../actions/fixedExpense";
import Expense from "../../data/Dummy-FixedExpense";
const initialState = {
  fixedExpense: [...Expense],
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COST:
      return { ...state, fixedExpense: [...state.fixedExpense, action.cost] };
    case IS_PAID:
      let newState = [...state.fixedExpense];
      newState.map((el) =>
        el.id === action.id ? (el.isPaid = action.stat) : null
      );
      return { ...state, fixedExpense: [...newState] };

    case ARCHIVE:
      let newStateToArchive = [...state.fixedExpense];
      let newEl = { ...newStateToArchive.find((el) => el.id === action.id) };
      newEl.isPaid = false;
      // console.log(newEl);

      return {
        ...state,
        history: [...state.history, newEl],
        // fixedExpense: [...state.fixedExpense, updatedEl ],
      };
  }
  return state;
};
