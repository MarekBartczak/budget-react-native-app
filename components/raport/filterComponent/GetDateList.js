const getDateList = (list) => {
  const dateList = list.map((el) => el.date.slice(0, 7));
  return dateList.filter((e, i, a) => a.indexOf(e) === i).sort();
};

export default getDateList;
