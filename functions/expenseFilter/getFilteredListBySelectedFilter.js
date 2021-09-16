const getFilteredListBySelectedFilter = (filter, items) => {
  const f = {
    date: filter.selectedFilter.date,
    place: filter.selectedFilter.place,
    mainCategory: filter.selectedFilter.mainCategory,
  };
  let list = items;

  if (f.date === "" && f.place === "" && f.mainCategory === "") {
    return list;
  }

  if (f.date !== "") {
    list = list.filter((el) => el.date === f.date);
  }

  if (f.place !== "") {
    list = list.filter((el) => el.place === f.place);
  }

  if (f.mainCategory !== "") {
    list = list.filter((el) => el.mainCategory === f.mainCategory);
  }

  return list;
};
export default getFilteredListBySelectedFilter;
