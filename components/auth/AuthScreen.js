// import firebase from "firebase";
import firebase from "firebase";

import "firebase/auth"; // import * as AppAuth from "expo-app-auth";
import * as Google from "expo-google-app-auth";
// import "firebase/database";

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
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

const AuthScreen = (props) => {
  // const { URLSchemes } = AppAuth;

  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const userStatus = useSelector((state) => state.auth.isLogin);
  // const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const login = () => {
    console.log("complete");
    dispatch(authActions.isLogin(true));
  };
  //temporary
  const userData = {
    user: "bart2525@gmail.com",
    password: "password1234",
  };
  // console.log(URLSchemes);
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqwJg7IR5BHLyn_oQpcViz0nKpdvrdAMo";

  const firebaseConfig = {
    apiKey: "AIzaSyAqwJg7IR5BHLyn_oQpcViz0nKpdvrdAMo",
    authDomain: "budget-reactnative-app.firebaseapp.com",
    databaseURL: "https://budget-reactnative-app-default-rtdb.firebaseio.com",
    projectId: "budget-reactnative-app",
    storageBucket: "budget-reactnative-app.appspot.com",
    messagingSenderId: "506404078923",
    appId: "1:506404078923:web:b4c4fd9ae0090a36fed4ce",
    // measurementId: 'G-measurement-id',
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  let database = firebase.database();

  const onSignIn = (googleUser) => {
    // console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.

      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.

        firebase
          .auth()
          .signInWithCredential(credential)
          .then(
            (result) => {
              console.log(result.user);
              firebase
                .database()
                .ref(`users/` + result.user.providerData[0].uid)
                .set({
                  username: result.user.providerData[0].displayName,
                  email: result.user.providerData[0].email,
                })
                .then(snapshot)
                .catch((err) => console.log(err));
              login();
            }

            // (result) => {
            // login();

            // }
          )
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };
  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        // behavior: "web",
        iosClientId:
          "506404078923-nrctlraih104rdme13i095b96ee3l6f6.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        // console.log(result);
        // googleBuildAndSignIn(result.idToken);
        onSignIn(result);
        // console.log(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  const signInWithEmailAndPassowrd = () => {
    // login()
    const auth = {
      email: userData.user,
      password: userData.password,
      returnSecureToken: true,
    };
    axios
      .post(url, auth)
      .then((res) => {
        console.log(res.data.email);
        login();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (userStatus) {
    // return (

    // );
    return <DrawerNavigator />;
  } else {
    return (
      <ExternalComponent>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <View style={styles.loginScreen}>
              <Input
                style={styles.input}
                placeholder={"email"}
                value={userEmail}
                keyboardType={"email-address"}
                onChangeText={setUserEmail}
              />
              <Input
                style={styles.input}
                placeholder={"hasło"}
                secureTextEntry={true}
                value={userPassword}
                onChangeText={setUserPassword}
              />
              <TouchableOpacity onPress={signInWithEmailAndPassowrd}>
                <Text style={styles.loginBtn}>Zaloguj</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                <Text style={styles.loginBtn}>logout</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.otherMethodLogin}>
              <TouchableOpacity
                style={styles.loginWithGoogle}
                onPress={() => signInWithGoogleAsync()}
              >
                <AntDesign name="google" size={34} color="white" />
                <Text style={styles.loginWithText}>Zaloguj przez Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginWithFacebook}
                onPress={() => {}}
              >
                <AntDesign name="facebook-square" size={34} color="white" />
                <Text style={styles.loginWithText}>Zaloguj przez Facebook</Text>
              </TouchableOpacity>
            </View>
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
    width: Dimensions.get("window").width * 0.9,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  loginScreen: {
    height: 200,
    marginBottom: 40,
  },
  loginBtn: {
    fontSize: 20,
    // height: 50,
    textAlign: "center",
    width: Dimensions.get("window").width * 0.9,
    borderWidth: 3,
    borderColor: Colors.shadowColor,
    padding: 15,
    borderRadius: 5,
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
    borderRadius: 5,
  },
  loginWithGoogle: {
    backgroundColor: Colors.google,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  loginWithText: {
    color: "white",
    // backgroundColor: "red",
    // height: "100%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
  },
});
