const validateChecker = (list) => {
  if (list.includes(undefined)) {
    return false;
  } else {
    return true;
  }
};
export default validateChecker;
