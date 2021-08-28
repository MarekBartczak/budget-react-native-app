import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
const History = (props) => {
  return (
    <TouchableOpacity>
      <View>
        <Text>
          {props.title} {props.cost}zł {props.date.replaceAll("-", ".")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default History;

const styles = StyleSheet.create({});
