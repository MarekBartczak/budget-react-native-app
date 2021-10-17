import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { MaterialIcons } from "@expo/vector-icons";

const createFavPlaceDefault = (userId) => {
  const favPlaceObject = {
    logo: "",
    name: "DODAJ",
  };
  const ref = firebase
    .database()
    .ref(`users/${userId}/favoritePlace/`)
    .push(favPlaceObject)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const createCategoryList = (userId, categoryList) => {
  const ref = firebase
    .database()
    .ref(`users/${userId}/categories/`)
    .push(categoryList)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const onSignIn = (googleUser, signinFunction, categoryList) => {
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
        .then((result) => {
          let isNewUser = result.additionalUserInfo.isNewUser;
          let userId = result.user.uid;

          if (isNewUser) {
            createCategoryList(userId, categoryList);
            for (let i = 0; i < 6; i++) {
              createFavPlaceDefault(userId);
            }
          }
          signinFunction();
        })
        .then(() => {})
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

const signInWithGoogleAsync = async (signinFunction, categoryList) => {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "712755376912-8qm9vlmvq4an1iqr2hqogfubhfglrn88.apps.googleusercontent.com",

      iosStandaloneAppClientId:
        "712755376912-8qm9vlmvq4an1iqr2hqogfubhfglrn88.apps.googleusercontent.com",

      iosClientId:
        "712755376912-32lu7emovkkc8fo0tv97igt6cobh855a.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
    if (result.type === "success") {
      onSignIn(result, signinFunction, categoryList);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

export default signInWithGoogleAsync;
