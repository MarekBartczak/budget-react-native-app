import { Text, View, TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const CategoryElementList = (props) => {
  const selected = {
    fontWeight: props.selected === props.list ? "bold" : null,
  };
  return (
    <View>
      <TouchableOpacity onPress={() => props.press(props.list)}>
        <Text
          style={{ ...props.style, ...{ fontWeight: selected.fontWeight } }}
        >
          {props.list}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryElementList;
