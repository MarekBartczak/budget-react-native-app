import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../../../constants/Colors";

import React from "react";
const History = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <TouchableOpacity style={{ ...styles.historyEl, ...{} }}>
      <View>
        <Text style={{ color: Colors[scheme].primarySecond }}>
          {props.title} {props.cost}zł {props.date}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default History;

const styles = StyleSheet.create({
  historyEl: {
    marginLeft: 20,
    marginTop: 5,
  },
});
