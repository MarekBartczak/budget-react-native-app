import axiosInstance from "../../AxiosInstance";
import firebase from "firebase";

const uid = "U5FPqWVHfEYKXvhNPUNiAeY0XSB3";

const removeFromFirebaseBySet = (id, type) => {
  firebase.database().ref(`users/${uid}/items/${type}/${id}`).set(null);
};
const deleteDataInCloud = {
  expense: (id) => {
    removeFromFirebaseBySet(id, "expense");
  },
  income: (id) => {
    removeFromFirebaseBySet(id, "income");
  },
  fixedExpense: (id) => {
    removeFromFirebaseBySet(id, "fixedExpense");
  },
  fixedIncome: (id) => {
    removeFromFirebaseBySet(id, "firebase");
  },
};

export default deleteDataInCloud;
