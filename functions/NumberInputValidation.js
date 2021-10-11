import switchComaToDot from "./switchCompaToDot";
const numberValidation = (value) => {
  if (value > 0) {
    return !isNaN(Number(switchComaToDot(value)));
  }
};

export default numberValidation;
