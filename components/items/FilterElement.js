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
    borderRadius: 5,
    height: 40,
    // borderBottomColor: Colors.backGround,
    // borderBottomWidth: 3,
    backgroundColor: Colors.default,
    paddingVertical: 3,
    justifyContent: "center",
  },
  text: {
    paddingLeft: 20,
    fontSize: 19,
    color: Colors.primary,
  },
});
