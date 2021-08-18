import firebase from "firebase";
import * as SecureStore from "expo-secure-store";

const pushNewItem = (obj, type) => {
  firebase
    .database()
    .ref(`users/${"U5FPqWVHfEYKXvhNPUNiAeY0XSB3"}/items/${type}/`)
    .push(obj)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

const saveDataToTheCloud = {
  expense: (obj) => {
    let newObj = {};
    obj.forEach((el) => {
      var newPostKey = firebase
        .database()
        .ref(`users/${"U5FPqWVHfEYKXvhNPUNiAeY0XSB3"}/items/expense/`)
        .child("expense")
        .push().key;

      let id = newPostKey;
      newObj[id] = el;
    });
    firebase
      .database()
      .ref(`users/${"U5FPqWVHfEYKXvhNPUNiAeY0XSB3"}/items/expense/`)
      .update({ ...newObj })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  },
  fixedExpense: (obj) => pushNewItem(obj, "fixedExpense"),
  income: (obj) => pushNewItem(obj, "income"),
  fixedIncome: (obj) => pushNewItem(obj, "fixedIncome"),
};

export default saveDataToTheCloud;
