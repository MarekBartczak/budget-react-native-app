import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
const CategoruElementList = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.press(props.list)}>
        <Text style={props.style}>{props.list}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoruElementList;
