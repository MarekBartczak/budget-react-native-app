import firebase from "firebase";

const updateConfigInClound = {
  theme: {
    set: {
      customScheme: (isEnabled, userId) => {
        // update is custom scheme is enabled,
        // disabled on default
        firebase
          .database()
          .ref(`users/${userId}/config/view/customScheme`)
          .set(isEnabled);
      },
      colorSet: (cheme, userId) => {
        // set color scheme
        firebase
          .database()
          .ref(`users/${userId}/config/view/colorSet`)
          .set(cheme);
      },
    },
  },
  account: {
    set: {
      updateDefaultEmail: (isEnabled, userId) => {
        firebase
          .database()
          .ref(`users/${userId}/config/account/updateDefaultEmail`)
          .set(isEnabled);
      },
      email: (email, userId) => {
        firebase
          .database()
          .ref(`users/${userId}/config/account/raportEmail`)
          .set(email);
      },
    },
  },
  language: {
    set: {
      language: (lang, userId) => {
        firebase
          .database()
          .ref(`users/${userId}/config/language/lang`)
          .set(lang);
      },
    },
  },
};

export default updateConfigInClound;
