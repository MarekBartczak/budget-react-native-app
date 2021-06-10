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
    dateForm("2021-05-24"),
    "Lidl",
    Category.foodExpense.drinks,
    "Woda zgrzewka",
    12.53
  ),
  new Item(
    "i3",
    dateForm("2021-05-24"),
    "Lidl",
    Category.foodExpense.dairy,
    "Ser biały",
    2.23
  ),
  new Item(
    "i4",
    dateForm("2021-05-25"),
    "Lidl",
    Category.housingExpense.furniture,
    "Taboret",
    44.99
  ),
  new Item(
    "i5",
    dateForm("2021-05-25"),
    "Biedronka",
    Category.householdChemistryExpense.cleaningProducts,
    "Ajax",
    3.99
  ),
  new Item(
    "i6",
    dateForm("2021-05-25"),
    "Sklep Sportowy",
    Category.clothingExpense.footwear,
    "Trampki",
    34.23
  ),
  new Item(
    "i7",
    dateForm("2021-05-26"),
    "Orlen",
    Category.automotiveExpense.fuel,
    "Paliwo Seat",
    220.65
  ),
  new Item(
    "i8",
    dateForm("2021-05-26"),
    "Empik",
    Category.officeSuppliesExpense.books,
    "Odyseja kosmiczna",
    39.99
  ),
  new Item(
    "i9",
    dateForm("2021-05-26"),
    "Lidl",
    Category.foodExpense.coffee,
    "Kawa ziarnista",
    64.34
  ),
  new Item(
    "i10",
    dateForm("2021-05-27"),
    "Sklep Biurowy",
    Category.officeSuppliesExpense.stationery,
    "Blok rysunkowy",
    3.99
  ),
  new Item(
    "i11",
    dateForm("2021-05-27"),
    "Fryzjer osiedlowy",
    Category.servicesExpense.hairdresser,
    "fryzura na łyso",
    18.0
  ),
  new Item(
    "i12",
    dateForm("2021-05-27"),
    "Lidl",
    Category.foodExpense.bread,
    "Chleb",
    4.53
  ),
  new Item(
    "i13",
    dateForm("2021-05-28"),
    "Online",
    Category.itExpense.services,
    "Netflix",
    14.31
  ),
  new Item(
    "i14",
    dateForm("2021-05-28"),
    "Lidl",
    Category.foodExpense.meat,
    "Kurczak",
    19.13
  ),
  new Item(
    "i15",
    dateForm("2021-05-28"),
    "Lidl",
    Category.foodExpense.drinks,
    "Woda gazowana",
    14.89
  ),
  new Item(
    "i16",
    dateForm("2021-05-29"),
    "Allegro",
    Category.automotiveExpense.parts,
    "Klocki hamulcowe",
    69.99
  ),
  new Item(
    "i17",
    dateForm("2021-05-29"),
    "Allegro",
    Category.automotiveExpense.maintenance,
    "Olej 15w40",
    124.31
  ),
  new Item(
    "i18",
    dateForm("2021-05-29"),
    "Lidl",
    Category.foodExpense.drinks,
    "CocaCola",
    5.99
  ),
  new Item(
    "i19",
    dateForm("2021-05-30"),
    "Castorama",
    Category.housingExpense.renovations,
    "Farba biała",
    234.19
  ),
  new Item(
    "i20",
    dateForm("2021-05-30"),
    "Castorama",
    Category.housingExpense.renovations,
    "Wałek do malowani",
    13.99
  ),
  new Item(
    "i21",
    dateForm("2021-05-30"),
    "McDonalds",
    Category.foodExpense.fastFood,
    "frytki",
    4.99
  ),
  new Item(
    "i22",
    dateForm("2021-05-31"),
    "Rossman",
    Category.householdChemistryExpense.cosmetics,
    "Szczoteczka do zębów",
    19.5
  ),
  new Item(
    "i23",
    dateForm("2021-05-31"),
    "Orlen",
    Category.automotiveExpense.fuel,
    "Paliwo Dacia",
    160.17
  ),
  new Item(
    "i24",
    dateForm("2021-05-31"),
    "Orlen",
    Category.automotiveExpense.maintenance,
    "Płyn do spryskiwaczy",
    19.99
  ),
  new Item(
    "i25",
    dateForm("2021-06-01"),
    "Auchan",
    Category.familyExpense.gifts,
    "Lego",
    69.99
  ),
  new Item(
    "i26",
    dateForm("2021-06-01"),
    "Auchan",
    Category.foodExpense.dogFood,
    "Karma",
    15.99
  ),
  new Item(
    "i27",
    dateForm("2021-06-02"),
    "Lidl",
    Category.foodExpense.bread,
    "Rogal maślany",
    1.99
  ),
  new Item(
    "i28",
    dateForm("2021-06-02"),
    "Lidl",
    Category.foodExpense.bread,
    "Rogal maślany",
    1.99
  ),
  new Item(
    "i29",
    dateForm("2021-06-02"),
    "Lidl",
    Category.foodExpense.bread,
    "chleb razowy",
    11.99
  ),
  new Item(
    "i30",
    dateForm("2021-06-10"),
    "Lidl",
    Category.foodExpense.bread,
    "chleb razowy",
    101.99
  ),
];

export default Items;
