const switchComaToDot = (StrNumber) => {
  if (StrNumber !== undefined) {
    return Number(StrNumber.replace(",", ".")).toFixed(2);
  }
};

export default switchComaToDot;
