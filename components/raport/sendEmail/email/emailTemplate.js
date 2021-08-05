const emailTemplate = (list) => {
  let NumberedList = {
    head: `<h2>Raport finansowy</h2> utworzony dnia: ${new Date()
      .toISOString()
      .slice(0, 10)}
    <hr />`,
    Expense: [],
    FixedExpense: [],
    Income: [],
    FixedIncome: [],
    fotter: `<h5>Podsumowanie:</h5>
    <ul>
    <li>2021 maj: 2123zł</li>
    <li>2021 lipiec: 321zł</li>
    </ul>`,
  };
  const liObj = (type, el) => {
    switch (type) {
      case "Expense":
        return `<li> ${el.date} | ${el.name} | ${el.category} | ${el.place} | <b>${el.cost}zł</b> </li>`;
      case "FixedExpense":
        return `<li> ${el.date} | ${el.title} | ${el.recipient} | <b>${el.cost}zł</b></li>`;
      case "Income":
        return `<li> ${el.date} | ${el.title} | ${el.from} | <b>${el.cost}zł</b></li>`;
      case "FixedIncome":
        return `<li> ${el.date} | ${el.title} | ${el.from} | <b>${el.cost}zł</b></li>`;
    }
  };
  const createNumberedList = (type) => {
    let numList = [];
    for (let i = 0; i < list[type].length; i++) {
      numList.push(list[type][i].map((el) => liObj(type, el)).join(""));
    }
    return numList;
  };
  NumberedList.Expense = createNumberedList("Expense");
  NumberedList.FixedExpense = createNumberedList("FixedExpense");
  NumberedList.Income = createNumberedList("Income");
  NumberedList.FixedIncome = createNumberedList("FixedIncome");

  return NumberedList;
};

export default emailTemplate;
