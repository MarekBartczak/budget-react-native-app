const getElementToFilterBy = (list, filterType) => {
  const typeList = list.map((el) => el[filterType]);
  const typeListOutOfDuplicates = [...new Set(typeList)];
  return typeListOutOfDuplicates.sort();
};

export default getElementToFilterBy;
