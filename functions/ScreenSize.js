import { Dimensions, useColorScheme } from "react-native";
const getScreenSize = () => {
  const screenSize = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  };

  const axb = Math.pow(screenSize.height, 2) + Math.pow(screenSize.width, 2);
  const size = Math.sqrt(axb);
  return Number(size).toFixed(0);
};

export default getScreenSize;
