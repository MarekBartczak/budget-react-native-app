const currentDate = new Date();
// const TestDate = new Date("2021-07-07");
const intervalObj = {
  month: "MONTH",
  day: "DAY",
  year: "YEAR",
};

const dateWithInterval = (date, interval) => {
  switch (interval.type) {
    case intervalObj.month:
      return new Date(date).setMonth(
        new Date(date).getMonth() + interval.interval
      );
    case intervalObj.day:
      return new Date(date).setDate(
        new Date(date).getDate() + interval.interval
      );
    case intervalObj.year:
      return new Date(date).setFullYear(
        new Date(date).getFullYear() + interval.interval
      );
    default:
      return;
  }
};

const daysLeft = (date) => {
  return Number(
    (Number(new Date(date)) - Number(currentDate)) / (1000 * 60 * 60 * 24)
  ).toFixed(0);
};

const nextPayDay = (date, interval) => {
  const shortCurrentDate = currentDate.toISOString().slice(0, 10);
  // const shortDate = date.toISOString().slice(0, 10);
  console.log(date);
  console.log(shortCurrentDate);
  if (shortCurrentDate === date) {
    return {
      days: 0,
      date: new Date(date).toISOString().slice(0, 10),
    };
  }

  if (shortCurrentDate < date) {
    return {
      days: Number(daysLeft(new Date(date).toISOString().slice(0, 10))) + 1,
      date: new Date(date).toISOString().slice(0, 10),
    };
  }
  if (shortCurrentDate > date) {
    let newDate = dateWithInterval(date, interval);
    return {
      days: Number(daysLeft(newDate)) + 1,
      date: new Date(newDate).toISOString().slice(0, 10),
    };
  }
};

// const showDate = nextPayDay(TestDate, { type: "MONTH", interval: 1 });
// console.log(showDate);
export default nextPayDay;
