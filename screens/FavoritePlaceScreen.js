import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FavoritePlaceScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Fav Place</Text>
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

export default FavoritePlaceScreen;
