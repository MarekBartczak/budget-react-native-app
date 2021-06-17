import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const FavoritePlaces = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.screen}>
        <Text>FavoritePlaces</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    backgroundColor: Colors.banner,
    alignItems: "center",
    shadowOffset: { height: 0, width: 10 },
    shadowColor: Colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    marginTop: 20,
  },
});

export default FavoritePlaces;
