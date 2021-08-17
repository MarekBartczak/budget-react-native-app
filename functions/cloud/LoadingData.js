import axiosInstance from "../../AxiosInstance";
import firebase from "firebase";

// const loadingData = () => {
//   const uid = "U5FPqWVHfEYKXvhNPUNiAeY0XSB3";
//   const itemRef = firebase.database().ref(`users/${uid}/items/expense`);
//   let list;
//   itemRef.on("value", (data) => {
//     let obj = data.val();

//     list = Object.keys(obj).map((key) => obj[key]);
//   });
//   return list;
// };

const loadingData = async () => {
  return await axiosInstance.get("items.json");
};

export default loadingData;
