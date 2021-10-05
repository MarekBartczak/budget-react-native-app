export const SET_EXPENSE = "SET_EXPENSE";
export const setExpense = (date) => {
  return { type: SET_EXPENSE, date: date };
};
export const SET_FIXED_EXPENSE = "SET_FIXED_EXPENSE";
export const setFixedExpense = (date) => {
  return { type: SET_FIXED_EXPENSE, date: date };
};
export const SET_INCOME = "SET_INCOME";
export const setIncome = (date) => {
  return { type: SET_INCOME, date: date };
};
