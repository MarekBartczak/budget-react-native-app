import firebase from "firebase";
import Colors from "../../../constants/Colors";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import * as favoritePlaceActions from "../../../store/actions/favoritePlace";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";
import * as incomeActions from "../../../store/actions/income";
import * as expenseActions from "../../../store/actions/items";
import { MaterialIcons } from "@expo/vector-icons";
import fontScale from "../../../constants/FontScale";

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
        // Sign-out successful.
      })
      .catch((error) => console.log(error));

    dispatch(authActions.logout(false));
  };
  return (
    <TouchableOpacity style={styles.logout} onPress={logout}>
      <View
        style={{
          width: Dimensions.get("window").width * 0.4,
          height: Dimensions.get("screen").height * 0.05,
          backgroundColor: Colors[scheme].backGround_one,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          shadowColor: Colors[scheme].drawerActive,
          shadowOffset: { height: 1, width: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Kanit_600SemiBold",
            color: Colors[scheme].button,
            fontSize: fontScale(9),
          }}
        >
          Wyloguj{" "}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  logout: {},
});
