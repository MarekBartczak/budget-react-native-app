import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const FavoritePlaceScreen = (props) => {
  const favPlaceList = useSelector(
    (state) => state.favoritePlace.favoritePlace
  );
  console.log(favPlaceList);
  return <View style={styles.screen}></View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritePlaceScreen;
