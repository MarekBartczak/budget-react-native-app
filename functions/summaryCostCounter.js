// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// list must be an array of objects with cost properties
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const filteredCost = (total, sum) => total + sum;

const summaryCostCounter = (list) => {
  const costList = list.map((el) => el.cost);
  return costList.reduce(filteredCost).toFixed(2);
};

export default summaryCostCounter;
