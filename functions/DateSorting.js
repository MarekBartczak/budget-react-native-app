const dateSorting = (dateList) => {
  const newList = [...dateList];
  const numberList = newList.map((el) => Number(el.replace(/-/g, "")));
  const numberListSort = numberList.sort();

  const dateListSort = numberListSort.map((el) => {
    const year = el.toString().slice(0, 4);
    const month = el.toString().slice(4, 6);
    const day = el.toString().slice(6, 8);
    return year + "-" + month + "-" + day;
  });

  return dateListSort;
};

export default dateSorting;
