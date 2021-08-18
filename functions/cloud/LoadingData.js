import firebase from "firebase";

const loadingData = async (type) => {
  const uid = "U5FPqWVHfEYKXvhNPUNiAeY0XSB3";
  const itemRef = firebase.database().ref(`users/${uid}/items/${type}`);
  let list;
  itemRef.on("value", async (data) => {
    let obj = await data.val();
    if (obj != null) {
      list = Object.keys(obj).map((key) => obj[key]);
      // console.log(list);
      return list;
    }
  });
  return list;
};

export default loadingData;
