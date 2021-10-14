import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import * as firebase from "firebase";

const createFavPlaceDefault = (userId) => {
  const favPlaceObject = {
    logo: "",
    name: "dodaj",
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

const signInWithApple = async (signinFunction, categoryList) => {
  const nonce = Math.random().toString(36).substring(2, 10);

  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
    .then((hashedNonce) =>
      AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      })
    )
    .then((appleCredential) => {
      const { identityToken } = appleCredential;
      const provider = new firebase.auth.OAuthProvider("apple.com");
      const credential = provider.credential({
        idToken: identityToken,
        rawNonce: nonce,
      });
      return firebase
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
        });
    })
    .catch((err) => console.log(err));
};

export default signInWithApple;
