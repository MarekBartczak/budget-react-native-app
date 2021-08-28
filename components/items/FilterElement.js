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
    backgroundColor: Colors.defaultThemeLight.white,
    paddingVertical: 3,
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  text: {
    paddingLeft: 20,
    fontSize: 19,
    color: Colors.defaultThemeLight.primaryDark,
  },
});
