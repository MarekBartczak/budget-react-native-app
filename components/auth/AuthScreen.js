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
import signInWithEmailAndPassowrd from "./authMethods/withEmailAndPassword";
import signInWithGoogleAsync from "./authMethods/withGoogle";
import firebaseInit from "./firebaseInit";
import Category from "../../data/category";
import registerWithEmail from "./authMethods/registerWithEmail";

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

  const checkIfPassowrds = (a, b) => {
    if (a === b) {
      return a;
    } else {
      false;
    }
  };

  const signUpButtons = () => {
    return (
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => {
            registerWithEmail(
              newUserEmail,
              checkIfPassowrds(newUserPassword, newUserPasswordRepeated),
              categoryList
            );
          }}
        >
          <View
            style={{
              ...styles.loginButton,
              ...{ backgroundColor: Colors[scheme].primary },
            }}
          >
            <Text
              style={{
                ...styles.loginBtnText,
                ...{ color: Colors[scheme].button },
              }}
            >
              {"Utwórz konto".toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signUpToggle()}>
          <View
            style={{
              ...styles.newAccount,
              ...{},
            }}
          >
            <Text
              style={{
                color: Colors[scheme].button,
                fontFamily: "Kanit_600SemiBold",
              }}
            >
              Zaloguj
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const signInButtons = () => {
    return (
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => signInWithEmailAndPassowrd(userEmail, userPassword)}
        >
          <View
            style={{
              ...styles.loginButton,
              ...{ backgroundColor: Colors[scheme].primary },
            }}
          >
            <Text
              style={{
                ...styles.loginBtnText,
                ...{ color: Colors[scheme].button },
              }}
            >
              {"Zaloguj".toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signUpToggle()}>
          <View
            style={{
              ...styles.newAccount,
              ...{},
            }}
          >
            <Text
              style={{
                color: Colors[scheme].button,
                fontFamily: "Kanit_600SemiBold",
              }}
            >
              Utwórz konto
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const signUpCompontnt = () => {
    return (
      <View
        style={{
          ...styles.loginScreen,
          ...{ backgroundColor: Colors[scheme].light },
        }}
      >
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
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          autoComplete="off"
          value={newUserEmail}
          keyboardType={"email-address"}
          onChangeText={setNewUserEmail}
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
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          autoComplete="off"
          secureTextEntry={true}
          value={newUserPassword}
          onChangeText={setNewUserPassword}
        />
        <Text
          style={{
            ...styles.credential,
            ...{ color: Colors[scheme].primarySecond },
          }}
        >
          {"Powtórz hasło".toUpperCase()}
        </Text>

        <Input
          style={{
            ...styles.input,
            ...{ backgroundColor: Colors[scheme].primaryThird },
          }}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          autoComplete="off"
          secureTextEntry={true}
          value={newUserPasswordRepeated}
          onChangeText={setNewUserPasswordRepeated}
        />
      </View>
    );
  };
  const signInComponent = () => {
    return (
      <View
        style={{
          ...styles.loginScreen,
          ...{ backgroundColor: Colors[scheme].light },
        }}
      >
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
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          autoComplete="off"
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
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          autoComplete="off"
          secureTextEntry={true}
          value={userPassword}
          onChangeText={setUserPassword}
        />
      </View>
    );
  };

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
        <ExternalComponent dimmer={0.85}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ ...styles.screen, ...{} }}>
              {signUp ? signUpCompontnt() : signInComponent()}
              {signUp ? signUpButtons() : signInButtons()}

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
    marginBottom: 40,

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
