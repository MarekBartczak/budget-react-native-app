const lang = {
  english: {
    category: {
      foodExpense: {
        name: "food",
        list: [
          "pieczywo",
          "nabiał",
          "napoje",
          "słodycze",
          "mrożonki",
          "alkohol",
          "fast food",
          "dania gotowe",
          "jedzenie na mieście",
          "mięso",
          "produkty sypkie (makaron, ryż, kasza)",
          "kawa",
          "inne",
          "jedzenie dla psa",
        ],
      },
      householdChemistryExpense: {
        name: "household chemistry",
        list: ["cosmetics", "medicines", "cleaning products"],
      },
      servicesExpense: {
        name: "services",
        list: ["medical visits", "hairdresser", "beautician"],
      },
      automotiveExpense: {
        name: "automotive",
        list: [
          "fuel",
          "motorway tolls",
          "repairs",
          "car maintenance",
          "auto parts",
        ],
      },
      housingExpense: {
        name: "housing",
        list: ["renovations", "furniture", "home electronics"],
      },
      itExpense: {
        name: "electronics",
        list: ["software", "computer parts", "it services"],
      },
      clothingExpense: {
        name: "clothing",
        list: [
          "footwear",
          "winter clothing",
          "summer clothing",
          "special (protective) clothing",
        ],
      },
      officeSuppliesExpense: {
        name: "office supplies",
        list: ["stationery", "books"],
      },
      familyExpense: { name: "family", list: ["gifts", "family outings"] },
    },
  },
  polish: {},
};

export const dataLang = [
  { en: "New Expenses", default: "Nowe Wydatki" },
  { en: "Expense", default: "Wydatki" },
  { en: "Fixed expense", default: "Stałe wydatki" },
  { en: "Income", default: "Wpływy" },
  { en: "Raport", default: "Raport" },
  { en: "Settings", default: "Ustawienia" },
];

export const selectLang = (selected, langFile, defaultWord) => {
  const translatedWord = langFile.find(
    (el) => el.default.toLowerCase() === defaultWord.toLowerCase()
  );

  return translatedWord[selected];
};
