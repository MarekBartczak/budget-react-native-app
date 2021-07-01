import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const ExternalComponentWithGradient = (props) => {
  return (
    <View>
      <LinearGradient
        colors={[
          Colors.gradientBackground.primary,
          Colors.gradientBackground.secondary,
        ]}
        style={styles.background}
      />
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
