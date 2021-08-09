export const ADD_FIXED_INCOME = "ADD_FIXED_INCOME";

export const addFixedIncome = (income) => {
  return { type: ADD_FIXED_INCOME, income: income };
};

export const DELETE_FIXED_INCOME = "DELETE_FIXED_INCOME";
export const delItem = (id) => {
  return { type: DELETE_FIXED_INCOME, itemId: id };
};
