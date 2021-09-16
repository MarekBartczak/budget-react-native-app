const getFilteredListBySearchInput = (input, items) => {
  let list = items;
  if (input === "" || input === undefined) {
    return list;
  }
  if (input !== "") {
    return list.filter((el) => el.subCategory === input);
  }
};

export default getFilteredListBySearchInput;
