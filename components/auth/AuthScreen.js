import firebase from "firebase";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from "react-native";
import React, { useState, useEffect } from "react";
import DrawerNavigator from "../../navigation/DrawerNavigator";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/auth";
import * as configActions from "../../store/actions/config";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import Input from "../input/Input";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import config from "./config/firebase";
import signInWithEmailAndPassowrd from "./authMethods/withEmailAndPassword";
import signInWithGoogleAsync from "./authMethods/withGoogle";
import signInWithFacebook from "./authMethods/withFacebook";
import firebaseInit from "./firebaseInit";
import Category from "../../data/category";
const AuthScreen = (props) => {
  const colorScheme = useColorScheme();
  const categoryList = { ...Category };
  // const sheme = Appearance.getColorScheme();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const customTheme = useSelector((state) => state.config.customScheme);
  const userStatus = useSelector((state) => state.auth.isLogin);
  const showIndicator = useSelector((state) => state.auth.showIndicator);
  const scheme = useSelector((state) => state.config.scheme);
  const dispatch = useDispatch();
  useEffect(() => {
    !customTheme && dispatch(configActions.getScheme(colorScheme));
  });
  const login = () => {
    dispatch(authActions.isLogin(true));
  };
  firebaseInit();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // dispatch(authActions.showIndicator(false));
      const userData = firebase.auth().currentUser;
      login();
      createUserInfo(userData);
    }
  });

  const createUserInfo = (user) => {
    const userDataObj = {
      name: user.displayName,
      email: user.providerData[0].email,
      photoURL: user.photoURL,
      id: user.uid,
    };
    firebase
      .database()
      .ref(`users/` + user.uid)
      .update({
        username: user.displayName,
        email: user.providerData[0].email,
        photoURL: user.photoURL,
      })
      .catch((err) => console.log(err));
    dispatch(authActions.saveUserData(userDataObj));
  };

  if (userStatus) {
    return <DrawerNavigator />;
  } else {
    if (showIndicator) {
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
    } else {
      return (
        <ExternalComponent dimmer={0.8}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ ...styles.screen, ...{} }}>
              <View style={styles.loginScreen}>
                <Text
                  style={{
                    ...styles.credential,
                    ...{ color: Colors[scheme].primarySecond },
                  }}
                >
                  {"Adres email".toUpperCase()}
                </Text>
                <Input
                  style={{
                    ...styles.input,
                    ...{ backgroundColor: Colors[scheme].primaryThird },
                  }}
                  // placeholder={"email"}
                  value={userEmail}
                  keyboardType={"email-address"}
                  onChangeText={setUserEmail}
                />
                <Text
                  style={{
                    ...styles.credential,
                    ...{ color: Colors[scheme].primarySecond },
                  }}
                >
                  {"Hasło".toUpperCase()}
                </Text>

                <Input
                  style={{
                    ...styles.input,
                    ...{ backgroundColor: Colors[scheme].primaryThird },
                  }}
                  // placeholder={"hasło"}
                  secureTextEntry={true}
                  value={userPassword}
                  onChangeText={setUserPassword}
                />

                <TouchableOpacity
                  onPress={() =>
                    signInWithEmailAndPassowrd(() => login(), config.url)
                  }
                >
                  <View
                    style={{
                      ...styles.loginButton,
                      ...{ backgroundColor: Colors[scheme].button },
                    }}
                  >
                    <Text
                      style={{
                        ...styles.loginBtnText,
                        ...{ color: Colors[scheme].primaryThird },
                      }}
                    >
                      {"Zaloguj".toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.otherMethodLogin}>
                <TouchableOpacity
                  onPress={() => {
                    signInWithGoogleAsync(() => login(), categoryList);
                  }}
                >
                  <View
                    style={{
                      ...styles.loginWithGoogle,
                      ...{ backgroundColor: Colors[scheme].google },
                    }}
                  >
                    <AntDesign name="google" size={24} color="white" />
                    <Text style={styles.loginWithText}>
                      {"Zaloguj przez Google".toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.loginWithFacebook}
                  // onPress={() => signInWithFacebook(() => login())}
                  onPress={() => signInWithFacebook()}
                >
                  <AntDesign name="facebook-square" size={34} color="white" />
                  <Text style={styles.loginWithText}>
                    Zaloguj przez Facebook
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ExternalComponent>
      );
    }
  }
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.light.primary,
  },

  input: {
    fontSize: 15,
    padding: 10,
    marginBottom: 10,
    width: Dimensions.get("window").width * 0.9,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    borderRadius: 10,
  },

  loginScreen: {
    height: 200,
    marginBottom: 40,
  },
  credential: {
    marginLeft: 10,
  },

  loginButton: {
    marginTop: 40,
    borderRadius: 10,
    // borderColor: Colors.light.button,
    // borderWidth: 2,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.3,
    // shadowRadius: 7,
  },

  loginBtnText: {
    fontSize: 20,
    textAlign: "center",
    width: Dimensions.get("window").width * 0.9,
    padding: 10,
  },

  otherMethodLogin: {
    width: Dimensions.get("window").width * 0.9,
  },
  loginWithFacebook: {
    backgroundColor: Colors.facebook,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  loginWithGoogle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
  },

  loginWithText: {
    color: "white",
    width: "80%",
    fontFamily: "Kanit_600SemiBold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
  },
});
