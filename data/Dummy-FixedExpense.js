import Expense from "../models/Expense";

const dateForm = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

const expense = [
  new Expense(
    "ei1",
    dateForm("2021-06-10"),
    "Telefon komórkowy",
    "Orange",
    150
  ),
  new Expense("ei2", dateForm("2021-06-01"), "Czynsz", "Spółdzielnia", 890),
  new Expense("ei3", dateForm("2021-06-05"), "meble", "Santander", 102),
  new Expense("ei4", dateForm("2021-06-20"), "internet", "Orange", 120),
  new Expense(
    "ei5",
    dateForm("2021-06-15"),
    "kredyt mieszkaniowy",
    "Santander",
    1200
  ),
  new Expense("ei6", dateForm("2021-06-11"), "Icloud", "Apple", 12.99),
  new Expense(
    "ei7",
    dateForm("2021-06-11"),
    "Audioteka",
    "Audioteka.com",
    19.99
  ),
];

export default expense;
