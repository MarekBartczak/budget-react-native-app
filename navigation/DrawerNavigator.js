import React, { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackExpenseNavigator from "./StackExpenseNavigator";
import StackIncomeNavigator from "./StackIncomeNavigator";
import StackFixedExpenseNavigator from "./StackFixedExpenseNavigator";
import StackRaportNavigator from "./StackRaportNavigator";
import StackFixedIncomeNavigator from "./StackFixedIncomeNavigator";
import StackSettingsNavigator from "./StackSettingsNavigator";
import StackUserNavigator from "./StackUserNavigator";
import { useSelector, useDispatch } from "react-redux";

import * as favoritePlaceActions from "../store/actions/favoritePlace";
import * as fixedExpenseActions from "../store/actions/fixedExpense";
import * as fixedIncomeActions from "../store/actions/fixedIncome";
import * as expenseActions from "../store/actions/items";
import * as incomeActions from "../store/actions/income";
import firebase from "firebase";

import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
const Drawer = createDrawerNavigator();
const isNotPadid = false;
const DrawerNavigator = (props) => {
  const userId = useSelector((state) => state.auth.userID);
  const userPhotoUrl = useSelector((state) => state.auth.userPhotoUrl);
  const userDisplayName = useSelector((state) => state.auth.userName);
  const fixedExpensesList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );

  const today = new Date();
  const dateList = fixedExpensesList.map((el) => new Date(el.date) > today);
  const isAllPaid = dateList.filter((el) => el === false);

  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const dispatchSwitcher = (type, list) => {
    switch (type) {
      case "income":
        dispatch(incomeActions.loadingIncomefromDB(list));
        return;
      case "expense":
        dispatch(expenseActions.loadingExpensefromDB(list));
        return;
      case "fixedExpense":
        dispatch(fixedExpenseActions.loadingFixedExpensefromDB(list));
        return;
      case "fixedIncome":
        dispatch(fixedIncomeActions.loadingFixedIncomefromDB(list));
        return;
    }
  };

  const loadingFavoritePlace = () => {
    const itemRef = firebase.database().ref(`users/${userId}/favoritePlace`);
    let list;
    itemRef.on("value", async (data) => {
      let obj = await data.val();
      if (obj != null) {
        let objKeyList = Object.keys(obj);
        let list = Object.values(obj);
        list.forEach((el, index) => (el.firebaseId = objKeyList[index]));
        dispatch(favoritePlaceActions.loadingFavoritePlaceFromDB(list));
      }
    });
  };
  const loadingData = (type) => {
    const uid = userId;
    const itemRef = firebase.database().ref(`users/${uid}/items/${type}`);
    let list;
    itemRef.on("value", async (data) => {
      let obj = await data.val();
      if (obj != null) {
        let objKeyList = Object.keys(obj);
        list = Object.values(obj);
        list.forEach((el, index) => (el.firebaseId = objKeyList[index]));
        dispatchSwitcher(type, list);
      }
    });
    setStatus(true);
    return list;
  };
  useEffect(() => {
    const fetchData = () => {
      loadingFavoritePlace();
      loadingData("income");
      loadingData("expense");
      loadingData("fixedExpense");
      loadingData("fixedIncome");
    };

    fetchData();
  });

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
            name="UserData"
            component={StackUserNavigator}
            options={{
              drawerIcon: () => (
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                  }}
                  source={{ url: userPhotoUrl }}
                />
              ),
              drawerLabel: userDisplayName,
            }}
          />
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
