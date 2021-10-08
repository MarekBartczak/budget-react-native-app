import dateSorting from "../functions/DateSorting";

// const generateDateListWithoutDuplicates = (data) => {
//   const listWithAllDates = data.map((el) => el.date);
//   return Array.from(new Set(listWithAllDates));
// };

// const rangeChecker = (dateList, range) => {
//   if (dateList.length === 0) {
//     return 0;
//   }
//   if (range > dateList.length - 1) {
//     return dateList.length;
//   }
//   if (range <= dateList.length - 1) {
//     return range;
//   }
// };

// const addingAmounts = (dateList, data) => {
//   const filteredData = [...data];
//   const sumElementsValue = (total, sum) => total + sum;
//   let newList = [];
//   let costList = [];
//   let sumOfElements = [];
//   let sum = 0;

//   for (let i = 0; i < dateList.length; i++) {
//     newList = filteredData.filter((el) => el.date === dateList[i]);
//     costList = newList.map((el) => el.cost);
//     sum = costList.reduce(sumElementsValue);
//     sumOfElements.push(sum);
//   }
//   return sumOfElements;
// };

// const reduceArrayToMaxRange = (array, range) => {
//   return array.splice(array.length - range, array.length);
// };

const removeDuplicates = (list) => {
  const outOfDuplicates = list.map((el) => el.date);
  return [...new Set(outOfDuplicates)];
};

const chartElement = (data, range) => {
  const dateListOutOfDuplicates = removeDuplicates(data).sort();
  // console.log(dateListOutOfDuplicates);
  /*
  create array contain objects with date and sum of cost,
  */

  // const chartEl = [{ date: "", cost: "" }];
  // console.log(data);
  return dateListOutOfDuplicates.map((el) => {
    const cost = data
      .map((d) => d.date === el && d.cost)
      .filter((x) => x !== false);
    // console.log(cost);
    const sumElementsValue = (total, sum) => total + sum;

    let sum = cost.reduce(sumElementsValue);
    // console.log(el);

    return { date: el, cost: Number(sum.toFixed(2)) };
    // console.log(el);
    // let x = data.filter((e) => {
    //   return e;
    // });
    // console.log(x);
    // console.log(el);
    // console.log(data);
    // const filterData = data.filter((e) => e.date === el);
    // console.log(filterData);
    // return {
    //   // label: el.split("-")[2],
    //   // data:
    // };
  });
  // console.log(data);
  // return dateListOutOfDuplicates.map((el) => {
  //   return { label: el.date, data: el.cost };
  // });
  // return data.map((el) => {
  //   return { date: el.date, cost: el.cost };
  // });
  // const finalDateList = dateSorting(generateDateListWithoutDuplicates(data));
  // const finalRange = rangeChecker(finalDateList, range);
  // const sum = addingAmounts(finalDateList, data);
  // return {
  //   label: reduceArrayToMaxRange(
  //     finalDateList.map((el) => el),
  //     finalRange
  //   ),
  //   data: reduceArrayToMaxRange(sum, finalRange),
  // };
};

export default chartElement;
