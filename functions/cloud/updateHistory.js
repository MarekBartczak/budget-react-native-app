import firebase from "firebase";

const updateHistory = (obj, userId) => {
  const ref = firebase
    .database()
    .ref(`users/${userId}/items/fixedExpenseHistory/`)
    .push(obj)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  //   console.log(obj);
  //   console.log(userId);
  //
  // update fixedExpense (not fixedExpenseHistory)
  // get ID of each item in fixedExpense
  // add history propertie to each item in fixedExpense
  // and save paid history there
};

export default updateHistory;
