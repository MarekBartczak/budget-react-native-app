import * as Facebook from "expo-facebook";
import firebase from "firebase";

const logIn = async (signinFunction) => {
  try {
    await Facebook.initializeAsync({
      appId: "854457038531802",
    });
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((err) => console.log(err));
      //   Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      console.log(await response.json());
      //   checkLoginState(response);
      //   signinFunction();
    } else {
      // type === 'cancel'
    }
  } catch (err) {
    alert(`Facebook Login Error: ${err}`);
  }
};
const checkLoginState = (response) => {
  if (response.authResponse) {
    // User is signed-in Facebook.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(response.authResponse, firebaseUser)) {
        // Build Firebase credential with the Facebook auth token.
        var credential = firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        );

        // Sign in with the credential from the Facebook user.
        firebase
          .auth()
          .signInWithCredential(credential)
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
        // User is already signed-in Firebase with the correct user.
      }
    });
  } else {
    // User is signed-out of Facebook.
    firebase.auth().signOut();
  }
};

const isUserEqual = (facebookAuthResponse, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
        providerData[i].uid === facebookAuthResponse.userID
      ) {
        // We don't need to re-auth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};
export default logIn;
