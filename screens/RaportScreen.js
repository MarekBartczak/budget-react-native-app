import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const RaportScreen = (props) => {
  return (
    <View>
      <LinearGradient
        colors={[
          Colors.gradientBackground.primary,
          Colors.gradientBackground.secondary,
        ]}
        style={styles.background}
      />
      <Text>Raport</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});

export default RaportScreen;
