import firebase from "firebase";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import { MaterialIcons } from "@expo/vector-icons";
const Logout = (props) => {
  const dispatch = useDispatch();
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
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
      <MaterialIcons name="logout" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  logout: { marginRight: 30 },
});