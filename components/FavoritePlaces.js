import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

const FavoritePlaces = (props) => {
  const icon = <View style={styles.icon}></View>;
  const favPlaceList = useSelector(
    (state) => state.favoritePlace.favoritePlace
  );
  // console.log(favPlaceList);
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.screen}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.banner,
    shadowOffset: { height: 0, width: 10 },
    shadowColor: Colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    marginTop: 20,
  },
  icon: {
    height: "40%",
    width: "30%",
    backgroundColor: "red",
  },
  row: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default FavoritePlaces;
