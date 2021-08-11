import axiosInstance from "../../AxiosInstance";

const deleteDataInCloud = {
  expense: (list) => {
    console.log(list);
    axiosInstance
      .put("items/expense.json", list)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  },
  income: (list) => {
    console.log(list);
    axiosInstance
      .put("items/income.json", list)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  },
  fixedExpense: (list) => {
    console.log(list);
    axiosInstance
      .put("items/fixedExpense.json", list)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  },
  fixedIncome: (list) => {
    console.log(list);
    axiosInstance
      .put("items/fixedIncome.json", list)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  },
};

export default deleteDataInCloud;
