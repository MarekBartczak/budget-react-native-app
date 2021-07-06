export const ADD_INCOME = "ADD_INCOME";

export const addIncome = (income) => {
  return { type: ADD_INCOME, income: income };
};
