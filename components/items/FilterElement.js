import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
const FilterList = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  return (
    <TouchableOpacity
      onPress={() => {
        props.callBack(props.data);
        props.close();
      }}
    >
      <View
        style={{
          ...styles.element,
          ...{ backgroundColor: Colors[scheme].primaryThird },
        }}
      >
        <Text
          style={{ ...styles.text, ...{ color: Colors[scheme].primarySecond } }}
        >
          {props.data}
        </Text>
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
  },
});
