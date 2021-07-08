const createObjectDate = (date) => {
  if (date === undefined) {
    date = new Date().toISOString().slice(0, 10);
  }
  return {
    year: new Date(date).getFullYear(),
    month: new Date(date).getMonth() + 1,
    day: new Date(date).getDate(),
    dayth: new Date(date),
  };
};

const comparePayDateWithCurrentDate = (date) => {
  const currentDate = createObjectDate();
  const getDate = createObjectDate(date);
  return {
    year: currentDate.year - getDate.year,
    month: currentDate.month - getDate.month,
    day: currentDate.day - getDate.day,
    diffrentDays: (currentDate.dayth - getDate.dayth) / (1000 * 60 * 60 * 24),
  };
};

const setNextPayDay = (date) => {
  const res = comparePayDateWithCurrentDate(date);
  const payDate = new Date(date);
  const newPayDate = new Date(
    payDate.setFullYear(payDate.getFullYear() + res.year)
  );
  newPayDate.setMonth(payDate.getMonth() + res.month);

  return { days: -res.day, date: newPayDate.toISOString().slice(0, 10) };
};

export default setNextPayDay;
