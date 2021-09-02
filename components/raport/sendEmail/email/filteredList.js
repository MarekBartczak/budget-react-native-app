const filteredList = (raport, data) => {
  const ItemsList = data;
  const dateList = raport;

  const obj = {
    Expense: [],
    FixedExpense: [],
    Income: [],
  };

  const createList = (type) => {
    if (dateList[type].isSelected) {
      const dateSelectedList = dateList[type].dateList[0]
        .filter((el) => el.isSelected === true)
        .map((el) => el.date);

      let filteredExpenseList = [];
      for (let i = 0; i < dateSelectedList.length; i++) {
        filteredExpenseList.push(
          ItemsList[type].filter(
            (el) => el.date.slice(0, 7) === dateSelectedList[i]
          )
        );
      }
      obj[type] = filteredExpenseList;
    }
  };

  createList("Expense");
  createList("FixedExpense");
  createList("Income");

  return obj;
};

export default filteredList;
