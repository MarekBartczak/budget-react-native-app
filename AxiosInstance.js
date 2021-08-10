import axios from "axios";

const instance = axios.create({
  baseURL: "https://budget-reactnative-app-default-rtdb.firebaseio.com/",
});

export default instance;
