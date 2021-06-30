import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const IncomeScreen = (props) => {
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
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Text>Wpływy</Text>
      </View>
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

export default IncomeScreen;
