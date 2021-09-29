import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../../../constants/Colors";

import React from "react";
const History = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <TouchableOpacity
      style={{
        ...styles.historyEl,
        ...{},
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 40,
          backgroundColor: Colors[scheme].light,
          borderRadius: 3,
          shadowColor: "black",
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
        }}
      >
        <Text
          style={{
            color: Colors[scheme].primarySecond,
            fontFamily: "Kanit_400Regular",
          }}
        >
          {props.date}
        </Text>
        <Text
          style={{
            color: Colors[scheme].primarySecond,
            fontFamily: "Kanit_400Regular",
          }}
        >
          {props.cost}zł
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default History;

const styles = StyleSheet.create({
  historyEl: {
    marginTop: 5,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    // borderBottomWidth: 1,
  },
});
