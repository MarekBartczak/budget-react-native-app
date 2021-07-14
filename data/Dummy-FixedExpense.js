import FixedExpense from "../models/FixedExpense";

const dateForm = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

const fixedExpense = [
  new FixedExpense(
    "ei1",
    dateForm("2021-06-10"),
    null,
    "Telefon komórkowy",
    "Orange",
    false,
    150,
    { days: 0, months: 1, years: 0 }
  ),
  new FixedExpense(
    "ei2",
    dateForm("2021-06-01"),
    null,
    "Czynsz",
    "Spółdzielnia",
    false,
    890,
    { days: 0, months: 1, years: 0 }
  ),
  new FixedExpense(
    "ei3",
    dateForm("2021-06-05"),
    null,
    "meble",
    "Santander",
    false,
    102,
    { days: 0, months: 1, years: 0 }
  ),
  new FixedExpense(
    "ei4",
    dateForm("2021-06-20"),
    null,
    "internet",
    "Orange",
    false,
    120,
    { days: 0, months: 1, years: 0 }
  ),
  new FixedExpense(
    "ei5",
    dateForm("2021-06-15"),
    null,
    "kredyt mieszkaniowy",
    "Santander",
    false,
    1200,
    { days: 0, months: 1, years: 0 }
  ),
  new FixedExpense(
    "ei6",
    dateForm("2021-06-11"),
    null,
    "Icloud",
    "Apple",
    false,
    12.99,
    { days: 0, months: 1, years: 0 }
  ),
  new FixedExpense(
    "ei7",
    dateForm("2021-07-11"),
    null,
    "Audioteka",
    "Audioteka.com",
    false,
    19.99,
    { days: 0, months: 1, years: 0 }
  ),
];

export default fixedExpense;
