import firebase from "firebase";

const signInWithEmailAndPassowrd = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)

    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

export default signInWithEmailAndPassowrd;
