import React, { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackExpenseNavigator from "./StackExpenseNavigator";
import StackIncomeNavigator from "./StackIncomeNavigator";
import StackFixedExpenseNavigator from "./StackFixedExpenseNavigator";
import StackRaportNavigator from "./StackRaportNavigator";
import StackFixedIncomeNavigator from "./StackFixedIncomeNavigator";
import StackSettingsNavigator from "./StackSettingsNavigator";
import { useSelector, useDispatch } from "react-redux";

import * as favoritePlaceActions from "../store/actions/favoritePlace";
import * as fixedExpenseActions from "../store/actions/fixedExpense";
import * as fixedIncomeActions from "../store/actions/fixedIncome";
import * as expenseActions from "../store/actions/items";
import * as incomeActions from "../store/actions/income";
import loadingData from "../functions/cloud/LoadingData";

import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
const Drawer = createDrawerNavigator();
const isNotPadid = false;
const DrawerNavigator = (props) => {
  const fixedExpensesList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );

  const today = new Date();
  const dateList = fixedExpensesList.map((el) => new Date(el.date) > today);
  const isAllPaid = dateList.filter((el) => el === false);

  const [loadedFavoritePlace, setLoadedFavoritePlace] = useState([]);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const result = await loadingData();
      dispatch(
        favoritePlaceActions.loadingFavoritePlaceFromDB(
          result.data.favoritePlace
        )
      );
      dispatch(
        fixedExpenseActions.loadingFixedExpensefromDB(result.data.fixedExpense)
      );
      dispatch(
        fixedIncomeActions.loadingFixedIncomefromDB(result.data.fixedIncome)
      );
      dispatch(expenseActions.loadingExpensefromDB(result.data.expense));
      dispatch(incomeActions.loadingIncomefromDB(result.data.income));
      setLoadedFavoritePlace(result.data.favoritePlace);
      setStatus(result ? true : false);
    };

    fetchData();
  }, []);

  if (status) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerType="back"
          drawerStyle={{ backgroundColor: Colors.banner }}
          drawerContentOptions={{
            activeTintColor: Colors.primary,
            labelStyle: { color: Colors.primary, fontSize: 15 },
          }}
        >
          <Drawer.Screen
            name="Home"
            component={StackExpenseNavigator}
            options={{
              drawerIcon: () => (
                <MaterialCommunityIcons
                  name="cash-minus"
                  size={34}
                  color={Colors.primary}
                />
              ),
              drawerLabel: "Wydatki",
            }}
          />
          <Drawer.Screen
            name="Stałe wydatki"
            component={StackFixedExpenseNavigator}
            options={{
              drawerIcon: () => (
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="calendar-arrow-left"
                    size={34}
                    color={Colors.primary}
                  />
                  <Text style={{ position: "absolute", marginLeft: 40 }}>
                    {isAllPaid.length > 0 ? (
                      <FontAwesome
                        name="exclamation-circle"
                        size={20}
                        color="red"
                      />
                    ) : null}
                  </Text>
                </View>
              ),
              drawerLabel: "Stałe wydatki",
            }}
          />
          <Drawer.Screen
            name="Wpływy"
            component={StackIncomeNavigator}
            options={{
              drawerIcon: () => (
                <MaterialCommunityIcons
                  name="cash-plus"
                  size={34}
                  color={Colors.primary}
                />
              ),
              drawerLabel: "Wpływy",
            }}
          />
          <Drawer.Screen
            name="Stałe wpływy"
            component={StackFixedIncomeNavigator}
            options={{
              drawerIcon: () => (
                <MaterialCommunityIcons
                  name="calendar-arrow-right"
                  size={34}
                  color={Colors.primary}
                />
              ),
              drawerLabel: "Stałe wpływy",
            }}
          />
          <Drawer.Screen
            name="Raport"
            component={StackRaportNavigator}
            options={{
              drawerIcon: () => (
                <MaterialCommunityIcons
                  name="file-document"
                  size={34}
                  color={Colors.primary}
                />
              ),
              drawerLabel: "Raport",
            }}
          />
          <Drawer.Screen
            name="Ustawienia"
            component={StackSettingsNavigator}
            options={{
              drawerIcon: () => (
                <Ionicons
                  name="ios-settings"
                  size={34}
                  color={Colors.primary}
                />
              ),
              drawerLabel: "Ustawienia",
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>
          <ActivityIndicator size="large" />
        </Text>
      </View>
    );
  }
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
