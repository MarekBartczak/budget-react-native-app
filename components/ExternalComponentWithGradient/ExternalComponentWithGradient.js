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
  return (
    <View>
      <Image
        style={{
          position: "absolute",
          // top: 0,
          height: Dimensions.get("window").height,
        }}
        source={path}
      />
      {props.dimmer === undefined && (
        <LinearGradient
          colors={[Colors[scheme].backGround, Colors[scheme].backGround]}
          style={styles.background}
        />
      )}
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
