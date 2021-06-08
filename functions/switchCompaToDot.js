const switchComaToDot = (StrNumber) => {
  return Number(StrNumber.replace(",", ".")).toFixed(2);
};

export default switchComaToDot;
