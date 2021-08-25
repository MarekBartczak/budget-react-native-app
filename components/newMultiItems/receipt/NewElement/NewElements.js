import { StyleSheet, Text, View, Dimensions } from "react-native";
import Category from "./categoryComponent/Categories";
import InputData from "./inputDataComponent/InputData";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const NewElements = (props) => {
  const isSelectedCategory = useSelector(
    (state) => state.item.category.selected
  );
  //   console.log(props);
  return (
    <View style={styles.screen}>
      {isSelectedCategory ? <InputData /> : <Category />}
    </View>
  );
};

export default NewElements;

const styles = StyleSheet.create({
  screen: {
    height: Dimensions.get("window").height * 0.75,
  },
});
