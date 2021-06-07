import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FavoritePlaces = (props) => {
  return (
    <View style={styles.screen}>
      <Text>FavoritePlaces</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
});

export default FavoritePlaces;
