import { dataLang, selectLang } from "../../../../lang/lang";

const countSum = (total, sum) => total + sum;
const sum = {
  Expense: { name: "Wydatki", amount: 0 },
  FixedExpense: { name: "Stałe wydatki", amount: 0 },
  Income: { name: "Wpływy", amount: 0 },
};

const clearSum = () => {
  sum.Expense = { name: "Wydatki", amount: 0 };
  sum.FixedExpense = { name: "Stałe wydatki", amount: 0 };
  sum.Income = { name: "Wpływy", amount: 0 };
};

const emailTemplate = (list, lang) => {
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
  const sumCounter = (type) => {
    if (list[type].length > 0) {
      let sumOfAllList = list[type].map((el) => {
        let costList = el.map((internalElement) => internalElement.cost);
        let sum = costList.reduce(countSum);
        return sum;
      });
      sum[type].amount = sumOfAllList.reduce(countSum).toFixed(2);
      // console.log(sum);
    }
  };

  sumCounter("Expense");
  sumCounter("FixedExpense");
  sumCounter("Income");

  let NumberedList = {
    head: `<h2>${translate("Raport finansowy")}</h2> ${translate(
      "utworzony dnia"
    )}: ${new Date().toISOString().slice(0, 10)}
    <hr />`,
    Expense: [],
    FixedExpense: [],
    Income: [],
    footer: `<h5>${translate("Podsumowanie")}:</h5>
    <ul>
    <li>${translate(sum.Expense.name)} : ${sum.Expense.amount} PLN</li>
    <li>${translate(sum.FixedExpense.name)} : ${
      sum.FixedExpense.amount
    } PLN</li>
    <li>${translate(sum.Income.name)} : ${sum.Income.amount} PLN</li>
    </ul>`,
  };
  const liObj = (type, el) => {
    switch (type) {
      case "Expense":
        // console.log(el);
        return `<li> ${el.date} | ${el.mainCategory} | ${el.subCategory} | ${el.place} | <b>${el.cost}PLN</b> </li>`;
      case "FixedExpense":
        return `<li> ${el.date} | ${el.title} | ${el.recipient} | <b>${el.cost}PLN</b></li>`;
      case "Income":
        return `<li> ${el.date} | ${el.title} | ${el.from} | <b>${el.cost}PLN</b></li>`;
    }
  };
  const createNumberedList = (type) => {
    let numList = [];
    for (let i = 0; i < list[type].length; i++) {
      numList.push("<ol>");
      numList.push(list[type][i].map((el) => liObj(type, el)).join(""));
      numList.push("</ol>");
    }
    return numList;
  };
  NumberedList.Expense = createNumberedList("Expense").join("");
  NumberedList.FixedExpense = createNumberedList("FixedExpense").join("");
  NumberedList.Income = createNumberedList("Income").join("");

  clearSum();
  // console.log(NumberedList.footer);
  return NumberedList;
};

export default emailTemplate;
