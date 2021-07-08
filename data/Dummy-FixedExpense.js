import FixedExpense from "../models/FixedExpense";

const dateForm = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

const fixedExpense = [
  new FixedExpense(
    "ei1",
    dateForm("2021-06-10"),
    "Telefon komórkowy",
    "Orange",
    false,
    150
  ),
  new FixedExpense(
    "ei2",
    dateForm("2021-06-01"),
    "Czynsz",
    "Spółdzielnia",
    false,
    890
  ),
  new FixedExpense(
    "ei3",
    dateForm("2021-06-05"),
    "meble",
    "Santander",
    false,
    102
  ),
  new FixedExpense(
    "ei4",
    dateForm("2021-06-20"),
    "internet",
    "Orange",
    false,
    120
  ),
  new FixedExpense(
    "ei5",
    dateForm("2021-06-15"),
    "kredyt mieszkaniowy",
    "Santander",
    false,
    1200
  ),
  new FixedExpense(
    "ei6",
    dateForm("2021-06-11"),
    "Icloud",
    "Apple",
    false,
    12.99
  ),
  new FixedExpense(
    "ei7",
    dateForm("2021-07-11"),
    "Audioteka",
    "Audioteka.com",
    false,
    19.99
  ),
];

export default fixedExpense;
