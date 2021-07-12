import switchComaToDot from "./switchCompaToDot";
const numberValidation = (value) => {
  return !isNaN(Number(switchComaToDot(value)));
};

export default numberValidation;
