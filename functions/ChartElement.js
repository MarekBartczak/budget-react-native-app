// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// range count from 0 && range < workingDateList.length
// data should be an array
// of objects contains {{ cost }}
// and {{ date }} properties
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// !!! rebuild this function

const chartElement = (data, range) => {
  if (data.length > 0 || range.length > 0) {
    const dateList = data.map((el) => el.date);
    const newDateList = (el) => el.filter((a, b) => el.indexOf(a) === b);
    const workingDateList = newDateList(dateList);

    if (range === undefined) {
      range = workingDateList.length - 1;
    }
    const calculateSum = (list, index) => {
      const filteredItems = data.filter((el) => el.date === list[index]);
      const filteredCostArray = filteredItems.map((el) => el.cost);
      const filteredCost = (total, sum) => total + sum;
      return filteredCostArray.reduce(filteredCost).toFixed(2);
    };

    let lastWeekDateArray = [];
    let parametr = 1;
    if (workingDateList.length === 1) {
      parametr = 0;
      range = 1;
    }
    for (let i = range; i >= 0; i--) {
      let newItem = workingDateList[
        workingDateList.length - parametr - i
      ].slice(5, 10);
      lastWeekDateArray.push({
        id: Number(newItem.replace("-", "")),
        date: newItem,
        cost: calculateSum(workingDateList, workingDateList.length - 1 - i),
      });
    }
    lastWeekDateArray.sort((a, b) => a.id - b.id);

    return {
      label: lastWeekDateArray.map((el) => el.date),
      data: lastWeekDateArray.map((el) => el.cost),
    };
  } else {
    return {
      label: ["0"],
      data: [0],
    };
  }
};

export default chartElement;
