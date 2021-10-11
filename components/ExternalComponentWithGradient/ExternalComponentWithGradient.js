import {
  StyleSheet,
  View,
  Dimensions,
  useColorScheme,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useSelector } from "react-redux";

const ExternalComponentWithGradient = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  let path;
  if (scheme === "light") {
    path = require("../../assets/dollar_light.jpeg");
  }
  if (scheme === "dark") {
    path = require("../../assets/dollar_dark.jpeg");
  }

  const showGradient = (dimmer) => {
    if (dimmer === undefined) {
      return (
        <LinearGradient
          colors={[
            Colors[scheme].backGround_one,
            Colors[scheme].backGround_one,
          ]}
          style={styles.background}
        />
      );
    }
    if (!isNaN(dimmer)) {
      if (dimmer >= 0 && dimmer <= 1) {
        const colorsInfo = Colors[scheme].backGround_one.split(",");
        const colorsObj = {
          r: Number(colorsInfo[0].slice(5)),
          g: Number(colorsInfo[1]),
          b: Number(colorsInfo[2]),
          a: Number(colorsInfo[3].slice(0, -1)),
        };

        return (
          <LinearGradient
            colors={[
              `rgba(${colorsObj.r}, ${colorsObj.g}, ${colorsObj.b}, ${dimmer})`,
              `rgba(${colorsObj.r}, ${colorsObj.g}, ${colorsObj.b}, ${dimmer})`,
            ]}
            style={styles.background}
          />
        );
      }
    }
  };
  return (
    <View>
      <Image
        style={{
          position: "absolute",
          height: Dimensions.get("window").height,
        }}
        source={path}
      />
      {showGradient(props.dimmer)}

      <View
        style={{
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {props.children}
      </View>
    </View>
  );
};

export default ExternalComponentWithGradient;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});
