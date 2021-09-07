import firebase from "firebase";

const updateCategory = (obj, userId) => {
  const ref = firebase
    .database()
    .ref(`users/${userId}/categories/`)
    .update(obj)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export default updateCategory;
