import axiosInstance from "../../AxiosInstance";
import firebase from "firebase";
import * as SecureStore from "expo-secure-store";

// import

// firebase.auth().onAuthStateChanged

// const pushNewItem = (type) => {
//   const dbRef = firebase.database().ref(`users/${uid}`);
// };

const pushNewItem = (obj, type) => {
  firebase
    .database()
    .ref(`users/${"U5FPqWVHfEYKXvhNPUNiAeY0XSB3"}/items/${type}/`)
    .push(obj)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

const saveDataToTheCloud = {
  // expense: (obj, numberOfItems) => {
  //   axiosInstance
  //     .put("items/expense/" + numberOfItems + ".json", obj)
  //     .then((res) => console.log(res.data))
  //     .catch((error) => console.log(error));
  // },
  expense: (obj) => pushNewItem(obj, "expense"),

  // (obj) => {
  //   firebase
  //     .database()
  //     .ref(`users/${"U5FPqWVHfEYKXvhNPUNiAeY0XSB3"}/items/expense/`)
  //     .push(obj)
  //     .then((res) => console.log(res))
  //     .catch((error) => console.log(error));
  // },
  fixedExpense: (obj) => pushNewItem(obj, "fixedExpense"),
  //  (obj, numberOfItems) => {
  //   axiosInstance
  //     .put("items/fixedExpense/" + numberOfItems + ".json", obj)
  //     .then((res) => console.log(res.data))
  //     .catch((error) => console.log(error));
  // },
  income: (obj) => pushNewItem(obj, "income"),
  // (obj, numberOfItems) => {
  //   axiosInstance
  //     .put("items/income/" + numberOfItems + ".json", obj)
  //     .then((res) => console.log(res.data))
  //     .catch((error) => console.log(error));
  // },
  fixedIncome: (obj) => pushNewItem(obj, "fixedIncome"),
  //  (obj, numberOfItems) => {
  //   axiosInstance
  //     .put("items/fixedIncome/" + numberOfItems + ".json", obj)
  //     .then((res) => console.log(res.data))
  //     .catch((error) => console.log(error));
  // },
};

export default saveDataToTheCloud;
