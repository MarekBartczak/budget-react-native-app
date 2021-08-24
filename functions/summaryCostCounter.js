// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// list must be an array of objects with cost properties
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const filteredCost = (total, sum) => total + sum;

const summaryCostCounter = (list) => {
  if (list.length > 0) {
    const costList = list.map(
      (el) => el.cost * (isNaN(el.multiply) ? 1 : el.multiply)
    );
    return costList.reduce(filteredCost).toFixed(2);
  } else {
    return "0";
  }
};

export default summaryCostCounter;
