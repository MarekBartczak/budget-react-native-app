import firebase from "firebase";

const deleteAccountPermanently = () => {
  const user = firebase.auth().currentUser;
  user
    .delete()
    .then((res) => {})
    .catch((error) => {
      console.log(error);
    });
};

export default deleteAccountPermanently;
