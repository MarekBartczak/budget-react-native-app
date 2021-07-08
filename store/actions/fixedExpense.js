export const ADD_COST = "ADD_COST";
export const addCost = (cost) => {
  return { type: ADD_COST, cost: cost };
};
export const IS_PAID = "IS_PAID";
export const isPaid = (stat, id) => {
  return { type: IS_PAID, stat: stat, id: id };
};

export const ARCHIVE = "ARCHIVE";
export const archive = (id) => {
  return { type: ARCHIVE, id: id };
};
