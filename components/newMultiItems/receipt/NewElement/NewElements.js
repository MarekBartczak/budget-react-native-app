import { StyleSheet, Text, View, Dimensions } from "react-native";
import Category from "./categoryComponent/Categories";
import InputData from "../../../../screens/expense/InputDataScreen";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const NewElements = (props) => {
  return (
    <View style={styles.screen}>
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
