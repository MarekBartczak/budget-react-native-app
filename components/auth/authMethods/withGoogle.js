import * as Google from "expo-google-app-auth";
import firebase from "firebase";

const onSignIn = (googleUser, signinFunction) => {
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
        .then((result) => {
          console.log(result.user.lastLoginAt);
          //   console.log(result.user.displayName);
          console.log(result.user.stsTokenManager.accessToken);
          console.log(result.user.stsTokenManager.expirationTime);
          console.log(result.user.stsTokenManager.refreshToken);

          signinFunction();
        })
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

export default signInWithGoogleAsync = async (signinFunction) => {
  try {
    const result = await Google.logInAsync({
      // androidClientId: YOUR_CLIENT_ID_HERE,
      // behavior: "web",
      iosClientId:
        "506404078923-nrctlraih104rdme13i095b96ee3l6f6.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      onSignIn(result, signinFunction);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};
