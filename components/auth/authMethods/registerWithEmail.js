import firebase from "firebase";

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

const createConfig = (userId) => {
  const configObj = {
    account: {
      raportEmail: "",
      updateDefaultEmail: false,
    },
    view: {
      colorSet: "light",
      customScheme: false,
    },
  };
  const ref = firebase
    .database()
    .ref(`users/${userId}/config`)
    .set(configObj)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const registerWithEmail = (email, password, categoryList) => {
  if (password !== undefined) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        userCred.user.updateProfile({
          displayName: email,
        });
        createCategoryList(userCred.user.uid, categoryList);
        createConfig(userCred.user.uid);
        for (let i = 0; i < 6; i++) {
          createFavPlaceDefault(userCred.user.uid);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default registerWithEmail;
