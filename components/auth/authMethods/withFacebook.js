import * as Facebook from "expo-facebook";
import firebase from "firebase";

// import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

// firebase.auth().onAuthStateChanged((user) => {
//   if (user != null) {
//     console.log("We are authenticated now!");
//   } else {
//     console.log("not");
//   }
// });

// https://graph.facebook.com/10226230336455510/picture?type=large&width=720&height=720
async function logIn() {
  try {
    // const result = await LoginManager.logInWithPermissions([
    //   "public_profile",
    //   "email",
    // ]);

    await Facebook.initializeAsync({
      appId: "566533791460990",
    });
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
    if (type === "success") {
      // Sign in using a popup.
      // var provider = new firebase.auth.FacebookAuthProvider();
      // provider.addScope("public_profile");
      // firebase
      //   .auth()
      //   .signInWithPopup(provider)
      //   .then(function (result) {
      //     console.log(token);
      //     console.log(user);
      //     // This gives you a Facebook Access Token.
      //     var token = result.credential.accessToken;
      //     // The signed-in user info.
      //     var user = result.user;
      //   });
      // const response = await fetch(
      //   `https://graph.facebook.com/me?access_token=${token}`
      // );
      // console.log(await response.json());
      // checkLoginState(response)
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error);
          // Handle Errors here.
          var errorCode = error.code;
          //     var errorMessage = error.message;
          //     // The email of the user's account used.
          //     var email = error.email;
          //     // The firebase.auth.AuthCredential type that was used.
          //     var credential = error.credential;
        });
      // console.log(token);
      // console.log(credential.accessToken);
      // Sign in with credential from the Facebook user.
      // firebase
      //   .auth()
      //   .signInWithCredential(credential)
      //   .then((res) => console.log(res))
      //   .catch((error) => {
      //     console.log(error);
      //     // alert(error);
      //     // Handle Errors here.
      //   });
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

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
