import axios from "axios";
const userData = {
  user: "test@test.pl",
  password: "testtest",
};

const signInWithEmailAndPassowrd = (signinFunction, url) => {
  const auth = {
    email: userData.user,
    password: userData.password,
    returnSecureToken: true,
  };
  axios
    .post(url, auth)
    .then((res) => {
      // console.log(res.data.localId);
      signinFunction(res.data.localId);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default signInWithEmailAndPassowrd;
