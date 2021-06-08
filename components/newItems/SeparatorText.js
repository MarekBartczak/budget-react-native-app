import { Text } from "react-native";
import React from "react";

const SeparatorText = (props) => {
  return <Text style={props.style}> {props.children} </Text>;
};

export default SeparatorText;
