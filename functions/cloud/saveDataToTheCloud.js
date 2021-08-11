import axiosInstance from "../../AxiosInstance";
const saveDataToTheCloud = {
  expense: (obj, numberOfItems) => {
    axiosInstance
      .put("items/expense/" + numberOfItems + ".json", obj)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  },
  fixedExpense: (obj, numberOfItems) => {
    axiosInstance
      .put("items/fixedExpense/" + numberOfItems + ".json", obj)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  },
  income: (obj, numberOfItems) => {
    axiosInstance
      .put("items/income/" + numberOfItems + ".json", obj)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  },
  fixedIncome: (obj, numberOfItems) => {
    axiosInstance
      .put("items/fixedIncome/" + numberOfItems + ".json", obj)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  },
};

export default saveDataToTheCloud;
