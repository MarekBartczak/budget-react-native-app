import { StyleSheet, Text, View, Dimensions } from "react-native";
import Category from "./categoryComponent/Categories";
import InputData from "../../../../screens/expense/InputDataScreen";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Colors from "../../../../constants/Colors";
const NewElements = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  return (
    <View
      style={{ ...styles.screen, ...{ backgroundColor: Colors[scheme].light } }}
    >
      <Category />
    </View>
  );
};

export default NewElements;

const styles = StyleSheet.create({
  screen: {
    height: Dimensions.get("window").height * 0.75,
  },
});
