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
};

export default updateConfigInClound;
