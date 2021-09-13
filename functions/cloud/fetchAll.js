import firebase from "firebase";

let globalObject = {
  favPlace: "",
};

const loadingFavoritePlace = async (userId) => {
  const itemRef = firebase.database().ref(`users/${userId}/favoritePlace`);
  let list;
  itemRef.on("value", async (data) => {
    let obj = await data.val();
    if (obj != null) {
      let objKeyList = Object.keys(obj);
      list = Object.values(obj);
      list.forEach((el, index) => (el.firebaseId = objKeyList[index]));
      // dispatch(favoritePlaceActions.loadingFavoritePlaceFromDB(list));
      // console.log(list);
      globalObject.favPlace = list;
    }
  });
  return globalObject.favPlace;
};

const loadingData = async (type, userId) => {
  const uid = userId;
  const itemRef = firebase.database().ref(`users/${uid}/items/${type}`);
  let list;
  //   let obj;
  itemRef.on("value", async (data) => {
    let obj = await data.val();
    if (obj != null) {
      let objKeyList = Object.keys(obj);
      list = Object.values(obj);
      list.forEach((el, index) => (el.firebaseId = objKeyList[index]));
      // dispatchSwitcher(type, list);
    }
  });
  // setStatus(true);
  return list;
};

const loadingCategory = async (userId) => {
  const uid = userId;
  const itemRef = firebase.database().ref(`users/${uid}/categories`);
  let list;
  let obj;
  itemRef.on("value", async (data) => {
    obj = await data.val();
    list = Object.values(obj);
    // dispatch(expenseActions.setCategoryId(Object.keys(obj)[0]));
    //   dispatch(expenseActions.loadingCategoriesFromDB(list[0]));
    return {
      categoryId: Object.keys(obj)[0],
      list: list[0],
    };
  });
};

const fetchAll = async (userId) => {
  // await loadingFavoritePlace(userId);
  let favPlace = await loadingFavoritePlace(userId);

  return {
    favPlace: favPlace,
    // category: await loadingCategory(userId),
    // income: await loadingData("income", userId),
    // expense: await loadingData("expense", userId),
    // fixedExpense: await loadingData("fixedExpense", userId),
  };
  // return globalObject;
};

export default fetchAll;
