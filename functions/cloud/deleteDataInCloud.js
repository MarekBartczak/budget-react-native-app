import firebase from "firebase";

const removeFromFirebaseBySet = (id, type, userId) => {
  firebase.database().ref(`users/${userId}/items/${type}/${id}`).set(null);
};
const deleteDataInCloud = {
  expense: (id, userId) => {
    removeFromFirebaseBySet(id, "expense", userId);
  },
  income: (id, userId) => {
    removeFromFirebaseBySet(id, "income", userId);
  },
  fixedExpense: (id, userId) => {
    removeFromFirebaseBySet(id, "fixedExpense", userId);
  },
};

export default deleteDataInCloud;
