export default validateChecker = (list) => {
  if (list.includes(undefined)) {
    return false;
  } else {
    return true;
  }
};
