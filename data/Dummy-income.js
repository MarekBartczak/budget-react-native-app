import Income from "../models/income";

const dateForm = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

const income = [
  new Income(
    "ii1",
    dateForm("2021-07-21"),
    "zwrot podatku",
    "Urzad skarbowy",
    1200
  ),
  new Income(
    "ii2",
    dateForm("2021-07-15"),
    "sprzedaż starych kapci",
    "olx",
    23.54
  ),
  new Income("ii3", dateForm("2021-07-20"), "playStore", "google", 150.45),
  new Income("ii4", dateForm("2021-07-12"), "strona WWW", "jan kowalski", 1200),
];

export default income;
