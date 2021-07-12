import Category from "./Category";
import Item from "../models/Item";

const dateForm = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

const Items = [
  new Item(
    "i1",
    dateForm("2021-05-24"),
    "Lidl",
    Category.foodExpense.bread,
    "Chleb",
    4.53
  ),
  new Item(
    "i2",
    dateForm("2021-05-25"),
    "Lidl",
    Category.foodExpense.drinks,
    "Woda zgrzewka",
    12.53
  ),
  new Item(
    "i3",
    dateForm("2021-06-01"),
    "Lidl",
    Category.foodExpense.dairy,
    "Ser biały",
    2.23
  ),
  new Item(
    "i4",
    dateForm("2021-01-02"),
    "Biedronka",
    Category.housingExpense.furniture,
    "Taboret",
    44.99
  ),
  new Item(
    "i5",
    dateForm("2021-01-01"),
    "Biedronka",
    Category.householdChemistryExpense.cleaningProducts,
    "Ajax",
    3.99
  ),
];

export default Items;
