import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import BudgetNavigator from "./navigation/BudgetNavigator";
import itemReducer from "./store/reducers/items";

const rootReducer = combineReducers({
  item: itemReducer,
});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <BudgetNavigator />
    </Provider>
  );
};

export default App;
