import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import itemReducer from "./store/reducers/items";
import FavoritePlacesReducer from "./store/reducers/favoritePlace";
import FixedExpenseReducer from "./store/reducers/fixedExpense";
import IncomeReducer from "./store/reducers/income";
import RaportReducer from "./store/reducers/raport";
import AuthScreen from "./components/auth/AuthScreen";
import AuthReducer from "./store/reducers/auth";
import Config from "./store/reducers/config";
import AppLoading from "expo-app-loading";
import Summary from "./store/reducers/summary";
import {
  useFonts,
  Kanit_400Regular,
  Kanit_600SemiBold,
} from "@expo-google-fonts/kanit";

const rootReducer = combineReducers({
  auth: AuthReducer,
  item: itemReducer,
  favoritePlace: FavoritePlacesReducer,
  fixedExpense: FixedExpenseReducer,
  income: IncomeReducer,
  raport: RaportReducer,
  config: Config,
  summary: Summary,
});

const store = createStore(rootReducer);
const App = () => {
  //
  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <AuthScreen />
        </Provider>
      </GestureHandlerRootView>
    );
  }
};

export default App;
