import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AddMultiItemsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text> add multi items</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AddMultiItemsScreen;
