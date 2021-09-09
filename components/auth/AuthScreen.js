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
  const userStatus = useSelector((state) => state.auth.isLogin);
  const showIndicator = useSelector((state) => state.auth.showIndicator);
  const scheme = useSelector((state) => state.config.scheme);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(configActions.getScheme(colorScheme));
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
        <ExternalComponent>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles[`screen_${scheme}`]}>
              <View style={styles.loginScreen}>
                <Text style={styles[`credential_${scheme}`]}>Adres email</Text>
                <Input
                  style={styles[`input_${scheme}`]}
                  // placeholder={"email"}
                  value={userEmail}
                  keyboardType={"email-address"}
                  onChangeText={setUserEmail}
                />
                <Text style={styles[`credential_${scheme}`]}>Hasło</Text>

                <Input
                  style={styles[`input_${scheme}`]}
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
                  <View style={styles[`loginButton_${scheme}`]}>
                    <Text style={styles[`loginBtnText_${scheme}`]}>
                      Zaloguj
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
                  <View style={styles.loginWithGoogle}>
                    <AntDesign name="google" size={24} color="white" />
                    <Text style={styles.loginWithText}>
                      Zaloguj przez Google
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
  screen_light: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
  },
  screen_dark: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.primary,
  },
  input_light: {
    fontSize: 15,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.light.primaryThird,
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
  input_dark: {
    fontSize: 15,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.dark.primaryThird,
    color: Colors.dark.primarySecond,
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
  credential_light: {
    marginLeft: 10,
    color: Colors.light.primarySecond,
  },
  credential_dark: {
    marginLeft: 10,
    color: Colors.dark.primarySecond,
  },

  loginButton_light: {
    marginTop: 40,
    backgroundColor: Colors.light.button,
    borderRadius: 10,
    // borderColor: Colors.light.button,
    // borderWidth: 2,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.3,
    // shadowRadius: 7,
  },
  loginButton_dark: {
    marginTop: 40,
    backgroundColor: Colors.dark.button,
    borderRadius: 10,
    // borderColor: Colors.dark.button,
    // borderWidth: 2,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.3,
    // shadowRadius: 7,
  },

  loginBtnText_light: {
    fontSize: 20,
    textAlign: "center",
    width: Dimensions.get("window").width * 0.9,
    padding: 10,
    color: Colors.light.primaryThird,
  },
  loginBtnText_dark: {
    fontSize: 20,
    textAlign: "center",
    width: Dimensions.get("window").width * 0.9,
    padding: 10,
    color: Colors.dark.primarySecond,
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
    backgroundColor: Colors.google,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
  },

  loginWithText: {
    color: "white",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
  },
});
