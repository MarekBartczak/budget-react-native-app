import Income from "../models/Income";

const dateForm = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

const income = [
  new Income("ii1", dateForm("2021-07-10"), "wyplata", "firma", 5400),
  new Income(
    "ii2",
    dateForm("2021-07-21"),
    "zwrot podatku",
    "Urzad skarbowy",
    1200
  ),
  new Income("ii3", dateForm("2021-07-15"), "appStore", "apple", 23.54),
  new Income("ii4", dateForm("2021-07-20"), "playStore", "google", 150.45),
  new Income("ii5", dateForm("2021-07-12"), "500+", "swiadczenia", 500),
];

export default income;
