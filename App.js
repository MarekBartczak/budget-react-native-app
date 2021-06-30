import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import BudgetNavigator from "./navigation/StackExpenseNavigator";
import DrawerNavigator from "./navigation/DrawerNavigator";
import itemReducer from "./store/reducers/items";
import FavoritePlacesReducer from "./store/reducers/favoritePlace";
import FixedExpenceReducer from "./store/reducers/fixedExpense";

const rootReducer = combineReducers({
  item: itemReducer,
  favoritePlace: FavoritePlacesReducer,
  fixedExpence: FixedExpenceReducer,
});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <DrawerNavigator />
    </Provider>
  );
};

export default App;
