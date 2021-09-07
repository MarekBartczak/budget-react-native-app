import firebase from "firebase";

const updateCategory = (obj, userId, categoryId) => {
  const ref = firebase
    .database()
    .ref(`users/${userId}/categories/${categoryId}/`)
    .set(obj)
    .catch((err) => console.log(err));
};

export default updateCategory;
