import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const itemListToAdd = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.setPlace(props.list)}>
        <Text style={styles.list}>{props.list}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default itemListToAdd;

const styles = StyleSheet.create({
  list: {
    color: Colors.banner,
    backgroundColor: Colors.primary,
    marginVertical: 3,
    borderRadius: 10,
    overflow: "hidden",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
