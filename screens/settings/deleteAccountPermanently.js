import firebase from "firebase";
import deleteDataInCloud from "../../functions/cloud/deleteDataInCloud";
const deleteAccountPermanently = () => {
  const user = firebase.auth().currentUser;
  // const uid = user.uid;
  // deleteDataInCloud.deleteUser(uid);
  const uid = user.uid;
  deleteDataInCloud.deleteUser(uid);
  user
    .delete()
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default deleteAccountPermanently;
