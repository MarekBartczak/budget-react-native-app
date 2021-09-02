import firebase from "firebase";
import Colors from "../../../constants/Colors";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import * as favoritePlaceActions from "../../../store/actions/favoritePlace";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";
import * as incomeActions from "../../../store/actions/income";
import * as expenseActions from "../../../store/actions/items";
import { MaterialIcons } from "@expo/vector-icons";

const Logout = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const dispatch = useDispatch();

  const clearStateAfterLogout = () => {
    dispatch(favoritePlaceActions.clearStateAfterLogout());
    dispatch(fixedExpenseActions.clearStateAfterLogout());
    dispatch(incomeActions.clearStateAfterLogout());
    dispatch(expenseActions.clearStateAfterLogout());
  };

  const logout = () => {
    dispatch(authActions.showIndicator(false));
    firebase
      .auth()
      .signOut()
      .then(() => {
        clearStateAfterLogout();
        console.log("logged out");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });

    dispatch(authActions.logout(false));
  };
  return (
    <TouchableOpacity style={styles.logout} onPress={logout}>
      <MaterialIcons
        name="logout"
        size={24}
        color={Colors[scheme].primarySecond}
      />
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  logout: { marginRight: 30 },
});
