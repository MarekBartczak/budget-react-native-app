import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import itemReducer from "./store/reducers/items";
import FavoritePlacesReducer from "./store/reducers/favoritePlace";
import FixedExpenseReducer from "./store/reducers/fixedExpense";
import FixedIncomeReducer from "./store/reducers/fixedIncome";
import IncomeReducer from "./store/reducers/income";
import RaportReducer from "./store/reducers/raport";
import AuthScreen from "./components/auth/AuthScreen";
import AuthReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
  auth: AuthReducer,
  item: itemReducer,
  favoritePlace: FavoritePlacesReducer,
  fixedExpense: FixedExpenseReducer,
  income: IncomeReducer,
  fixedIncome: FixedIncomeReducer,
  raport: RaportReducer,
});

const store = createStore(rootReducer);
const App = () => {
  return (
    <Provider store={store}>
      <AuthScreen />
    </Provider>
  );
};

export default App;
