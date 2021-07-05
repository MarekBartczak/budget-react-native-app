const switchComaToDot = (StrNumber) => {
  return Number(StrNumber.replaceAll(",", ".")).toFixed(2);
};

export default switchComaToDot;
