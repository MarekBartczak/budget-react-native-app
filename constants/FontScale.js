import { Dimensions } from "react-native";

const fontScale = (size) => {
  return (
    (Dimensions.get("window").height / Dimensions.get("window").width) * size
  );
};

export default fontScale;
