import axios from "axios";
const userData = {
  user: "bart2525@gmail.com",
  password: "password",
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
      console.log(res.data.email);
      signinFunction();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default signInWithEmailAndPassowrd;
