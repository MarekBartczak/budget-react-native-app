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
  useColorScheme,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import DrawerNavigator from "../../navigation/DrawerNavigator";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/auth";
import * as configActions from "../../store/actions/config";
// import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import Input from "../input/Input";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import signInWithEmailAndPassowrd from "./authMethods/withEmailAndPassword";
import signInWithGoogleAsync from "./authMethods/withGoogle";
import firebaseInit from "./firebaseInit";
import Category from "../../data/category";
import registerWithEmail from "./authMethods/registerWithEmail";
import AppleLoginButton from "./authMethods/buttons/AppleLogin";
import GoogleLoginButton from "./authMethods/buttons/GoogleLogin";
import appleLogin from "./authMethods/withApple";
const AuthScreen = (props) => {
  const colorScheme = useColorScheme();
  const categoryList = { ...Category };
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [signUp, setSignUp] = useState(false);
  const customTheme = useSelector((state) => state.config.customScheme);
  const userStatus = useSelector((state) => state.auth.isLogin);
  const showIndicator = useSelector((state) => state.auth.showIndicator);
  const scheme = useSelector((state) => state.config.scheme);
  const [newUserEmail, setNewUserEmail] = useState();
  const [newUserPassword, setNewUserPassword] = useState();
  const [newUserPasswordRepeated, setNewUserPasswordRepeated] = useState();
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
      const userData = firebase.auth().currentUser;
      login();
      createUserInfo(userData);
    }
  });

  const createUserInfo = (user) => {
    console.log(user);
    const userDataObj = {
      name: user.displayName ? user.displayName : user.providerData[0].email,
      email: user.providerData[0].email,
      photoURL: user.photoURL,
      id: user.uid,
    };
    firebase
      .database()
      .ref(`users/` + user.uid)
      .update({
        username: user.displayName
          ? user.displayName
          : user.providerData[0].email,
        email: user.providerData[0].email,
        photoURL: user.photoURL,
      })
      .catch((err) => console.log(err));
    dispatch(authActions.saveUserData(userDataObj));
  };

  const signUpToggle = () => {
    setSignUp(!signUp);
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <ImageBackground
              style={{
                position: "absolute",
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                // height: Dimensions.get("window").height,
              }}
              resizeMode="cover"
              source={require("../../assets/login_screen.png")}
            />

            <View style={{ ...styles.screen, ...{} }}>
              <View style={styles.otherMethodLogin}>
                <GoogleLoginButton
                  press={() =>
                    signInWithGoogleAsync(() => login(), categoryList)
                  }
                />
                <AppleLoginButton
                  press={() => appleLogin(() => login(), categoryList)}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
  },
  newAccount: {
    padding: 10,
    width: Dimensions.get("window").width * 0.9,
    alignItems: "center",
  },

  input: {
    fontSize: 15,
    padding: 10,
    marginBottom: 10,
    borderRadius: 3,

    height: 40,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 10,
  },

  loginScreen: {
    marginTop: 200,

    width: Dimensions.get("window").width * 0.9,

    padding: 20,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  credential: {
    marginLeft: 10,
  },

  loginButton: {
    marginTop: 10,
    borderRadius: 3,

    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  loginBtnText: {
    fontSize: 20,
    textAlign: "center",
    width: Dimensions.get("window").width * 0.9,
    padding: 10,
    fontFamily: "Kanit_600SemiBold",
  },

  otherMethodLogin: {
    position: "absolute",
    bottom: 100,
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
    // paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
  },

  loginWithText: {
    color: "white",
    width: "70%",
    fontFamily: "Kanit_600SemiBold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 15,
  },
});
