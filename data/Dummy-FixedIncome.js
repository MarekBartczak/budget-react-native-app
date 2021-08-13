import Income from "../models/income";

const dateForm = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

const fixedIncome = [
  new Income("fii1", dateForm("2021-07-10"), "wyplata", "firma", 5400),
  new Income("fii2", dateForm("2021-07-12"), "500+", "swiadczenia", 500),
];

export default fixedIncome;
