const setNextPayDay = (date, interval) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + interval.days);
  newDate.setMonth(newDate.getMonth() + interval.months);
  newDate.setYear(newDate.getFullYear() + interval.years);
  return newDate.toISOString().slice(0, 10);
};

export default setNextPayDay;
