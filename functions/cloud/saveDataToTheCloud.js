import firebase from "firebase";

const pushNewItem = (obj, type, userId) => {
  firebase
    .database()
    .ref(`users/${userId}/items/${type}/`)
    .push(obj)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

const saveDataToTheCloud = {
  expense: (obj, userid) => {
    let newObj = {};
    obj.forEach((el) => {
      var newPostKey = firebase
        .database()
        .ref(`users/${userid}/items/expense/`)
        .child("expense")
        .push().key;

      let id = newPostKey;
      newObj[id] = el;
    });
    firebase
      .database()
      .ref(`users/${userid}/items/expense/`)
      .update({ ...newObj })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  },
  fixedExpense: (obj, userId) => pushNewItem(obj, "fixedExpense", userId),
  income: (obj, userId) => pushNewItem(obj, "income", userId),
};

export default saveDataToTheCloud;
