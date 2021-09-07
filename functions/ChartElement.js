import dateSorting from "../functions/DateSorting";

const generateDateListWithoutDuplicates = (data) => {
  const listWithAllDates = data.map((el) => el.date);
  return Array.from(new Set(listWithAllDates));
};

const rangeChecker = (dateList, range) => {
  if (dateList.length === 0) {
    return 0;
  }
  if (range > dateList.length - 1) {
    return dateList.length;
  }
  if (range <= dateList.length - 1) {
    return range;
  }
};

const addingAmounts = (dateList, data) => {
  const filteredData = [...data];
  const sumElementsValue = (total, sum) => total + sum;
  let newList = [];
  let costList = [];
  let sumOfElements = [];
  let sum = 0;

  for (let i = 0; i < dateList.length; i++) {
    newList = filteredData.filter((el) => el.date === dateList[i]);
    costList = newList.map((el) => el.cost * (el.multiply ? el.multiply : 1));
    sum = costList.reduce(sumElementsValue);
    sumOfElements.push(sum);
  }
  return sumOfElements;
};

const reduceArrayToMaxRange = (array, range) => {
  return array.splice(array.length - range, array.length);
};

const chartElement = (data, range) => {
  const finalDateList = dateSorting(generateDateListWithoutDuplicates(data));
  const finalRange = rangeChecker(finalDateList, range);
  const sum = addingAmounts(finalDateList, data);
  return {
    label: reduceArrayToMaxRange(
      finalDateList.map((el) => el),
      finalRange
    ),
    data: reduceArrayToMaxRange(sum, finalRange),
  };
};

export default chartElement;
