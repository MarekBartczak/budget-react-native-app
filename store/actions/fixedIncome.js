export const ADD_FIXED_INCOME = "ADD_FIXED_INCOME";

export const addFixedIncome = (income) => {
  return { type: ADD_FIXED_INCOME, income: income };
};
