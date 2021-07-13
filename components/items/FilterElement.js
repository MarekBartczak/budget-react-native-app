import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
const FilterList = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.callBack(props.data);
        props.close();
      }}
    >
      <View style={styles.element}>
        <Text style={styles.text}>{props.data}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterList;

const styles = StyleSheet.create({
  element: {
    margin: 10,
    borderBottomColor: Colors.shadowColor,
    borderBottomWidth: 3,
    backgroundColor: Colors.shadowColor,
    paddingVertical: 3,
    justifyContent: "center",
  },
  text: {
    paddingLeft: 20,
    fontSize: 15,
    color: Colors.banner,
  },
});
