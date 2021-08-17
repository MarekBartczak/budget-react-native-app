import firebase from "firebase";

export default init = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config.firebase);
  }
};
