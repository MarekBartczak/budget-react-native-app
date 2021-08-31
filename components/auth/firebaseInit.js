import firebase from "firebase";
import config from "./config/firebase";

const init = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config.firebase);
  }
};
export default init;
