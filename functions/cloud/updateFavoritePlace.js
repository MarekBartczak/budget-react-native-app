import firebase from "firebase";

const updateFavoritePlace = (obj, userId) => {
  const ref = firebase.database().ref(`users/${userId}/favoritePlace/`);
  const newObj = {};
  obj.forEach((el) => {
    newObj[el.firebaseId] = { logo: el.logo, name: el.name };
  });
  ref.update(newObj);
};

export default updateFavoritePlace;
