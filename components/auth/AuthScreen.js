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
} from "react-native";
import React, { useState } from "react";
import DrawerNavigator from "../../navigation/DrawerNavigator";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/auth";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import Input from "../input/Input";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import config from "./config/firebase";
import signInWithEmailAndPassowrd from "./authMethods/withEmailAndPassword";
import signInWithGoogleAsync from "./authMethods/withGoogle";
import signInWithFacebook from "./authMethods/withFacebook";
import firebaseInit from "./firebaseInit";

const AuthScreen = (props) => {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const userStatus = useSelector((state) => state.auth.isLogin);
  const showIndicator = useSelector((state) => state.auth.showIndicator);
  const dispatch = useDispatch();
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
    // testReadData(user.uid);
  };

  // const testReadData = (uid) => {
  //   const itemRef = firebase.database().ref(`users/${uid}`);
  //   itemRef.on("value", (data) => {
  //     const items = data.val();
  //     // console.log(items);
  //   });
  // };

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
                <TouchableOpacity
                  onPress={() =>
                    signInWithEmailAndPassowrd(() => login(), config.url)
                  }
                >
                  <Text style={styles.loginBtn}>Zaloguj</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.otherMethodLogin}>
                <TouchableOpacity
                  style={styles.loginWithGoogle}
                  onPress={() => {
                    signInWithGoogleAsync(() => login());
                  }}
                >
                  <AntDesign name="google" size={34} color="white" />
                  <Text style={styles.loginWithText}>Zaloguj przez Google</Text>
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
