import firebase from "firebase";

const updateHistory = {
  addNew: (obj, userId) => {
    firebase
      .database()
      .ref(`users/${userId}/items/fixedExpense/`)
      .push(obj)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    // .then((res) => console.log(res))
    // .catch((err) => console.log(err));
    //   console.log(obj);
    //   console.log(userId);
    //
    // update fixedExpense (not fixedExpenseHistory)
    // get ID of each item in fixedExpense
    // add history propertie to each item in fixedExpense
    // and save paid history there
  },

  setIsPadid: (obj, userId) => {
    firebase
      .database()
      .ref(`users/${userId}/items/fixedExpense/${obj.firebaseId}/`)
      .set(obj)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  },
};

export default updateHistory;
