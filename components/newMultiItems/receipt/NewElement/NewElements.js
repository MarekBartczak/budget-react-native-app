import { StyleSheet, Text, View, Dimensions } from "react-native";
import Category from "./categoryComponent/Categories";
import InputData from "./inputDataComponent/InputData";
import React, { useState } from "react";

const NewElements = (props) => {
  const [showCategory, setShowCategory] = useState(true);
  //   console.log(props);
  return (
    <View style={styles.screen}>
      {showCategory ? <Category /> : <InputData />}
    </View>
  );
};

export default NewElements;

const styles = StyleSheet.create({
  screen: {
    height: Dimensions.get("window").height * 0.75,
  },
});
