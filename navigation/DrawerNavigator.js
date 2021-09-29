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
import StackSettingsNavigator from "./StackSettingsNavigator";
import StackUserNavigator from "./StackUserNavigator";
import { useSelector, useDispatch } from "react-redux";

import updateConfigInClound from "../functions/cloud/config/updateConfigInClound";
import * as favoritePlaceActions from "../store/actions/favoritePlace";
import * as fixedExpenseActions from "../store/actions/fixedExpense";
import * as expenseActions from "../store/actions/items";
import * as incomeActions from "../store/actions/income";
import * as authActions from "../store/actions/auth";
import * as raportActions from "../store/actions/raport";
import * as configActions from "../store/actions/config";
import firebase from "firebase";

import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
const Drawer = createDrawerNavigator();
const isNotPadid = false;
const DrawerNavigator = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const userId = useSelector((state) => state.auth.userID);
  const userPhotoUrl = useSelector((state) => state.auth.userPhotoUrl);
  const userDisplayName = useSelector((state) => state.auth.userName);
  const fetchedData = useSelector((state) => state.auth.fetchedData);
  const delayCost = useSelector((state) => state.fixedExpense.delayCost);

  const fixedExpensesList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );

  const today = new Date();

  const dateList = fixedExpensesList.filter((el) => new Date(el.date) < today);

  const isAllPaid = dateList.filter((el) => el.isPaid === false);

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
    }
  };

  const loadingConfig = async () => {
    let customScheme = firebase
      .database()
      .ref(`users/${userId}/config/view/customScheme`);
    customScheme.on("value", async (data) => {
      let val = await data.val();
      dispatch(configActions.toggleCustomTheme(val));
    });

    let colorSet = firebase
      .database()
      .ref(`users/${userId}/config/view/colorSet`);
    colorSet.on("value", async (data) => {
      let val = await data.val();
      dispatch(configActions.getScheme(val));
    });

    let updateDefaultEmail = firebase
      .database()
      .ref(`users/${userId}/config/account/updateDefaultEmail`);
    updateDefaultEmail.on("value", async (data) => {
      let val = await data.val();
      dispatch(raportActions.toggleDefaultEmail(val));
    });
    let email = firebase
      .database()
      .ref(`users/${userId}/config/account/raportEmail`);
    email.on("value", async (data) => {
      let val = await data.val();
      dispatch(raportActions.setEmail(val));
    });
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
  const loadingData = async (type) => {
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

  const loadingCategory = async () => {
    const uid = userId;
    const itemRef = firebase.database().ref(`users/${uid}/categories`);
    let list;
    itemRef.on("value", async (data) => {
      let obj = await data.val();
      list = Object.values(obj);
      dispatch(expenseActions.setCategoryId(Object.keys(obj)[0]));
      dispatch(expenseActions.loadingCategoriesFromDB(list[0]));
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      loadingConfig();
      loadingFavoritePlace();
      await loadingCategory();
      await loadingData("income");
      await loadingData("expense");
      await loadingData("fixedExpense");
    };
    fetchData();
    // if () {
    // dispatch(authActions.fetchData(true));
    // }
  }, [status]);

  if (status) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerType="back"
          drawerStyle={{
            backgroundColor: Colors[scheme].backGround,
          }}
          drawerContentOptions={{
            activeTintColor: Colors[scheme].drawerActive,
            labelStyle: { color: Colors[scheme].primarySecond, fontSize: 15 },
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
                  color={Colors[scheme].primarySecond}
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
                    color={Colors[scheme].primarySecond}
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
                  color={Colors[scheme].primarySecond}
                />
              ),
              drawerLabel: "Wpływy",
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
                  color={Colors[scheme].primarySecond}
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
                  color={Colors[scheme].primarySecond}
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
