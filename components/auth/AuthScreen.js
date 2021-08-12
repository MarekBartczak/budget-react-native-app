import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import DrawerNavigator from "../../navigation/DrawerNavigator";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/auth";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import Input from "../input/Input";
import Colors from "../../constants/Colors";
const AuthScreen = (props) => {
  const userStatus = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const login = () => {
    dispatch(authActions.isLogin(true));
  };

  if (userStatus) {
    return <DrawerNavigator />;
  } else {
    return (
      <ExternalComponent>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <View style={styles.loginScreen}>
              <Input style={styles.input} placeholder={"email"} />
              <Input
                style={styles.input}
                placeholder={"password"}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity onPress={login}>
              <Text style={{ color: "blue" }}>Zaloguj</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ExternalComponent>
    );
  }
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    padding: 10,
    marginBottom: 30,
    backgroundColor: Colors.accent,
    width: Dimensions.get("window").width * 0.7,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  loginScreen: {
    height: 200,
  },
});
