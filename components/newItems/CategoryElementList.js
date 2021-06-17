import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const CategoruElementList = (props) => {
  const selected = {
    color: props.selected === props.list ? Colors.accent : Colors.primary,
  };
  return (
    <View>
      <TouchableOpacity onPress={() => props.press(props.list)}>
        <Text style={{ ...props.style, ...{ color: selected.color } }}>
          {props.list}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoruElementList;
