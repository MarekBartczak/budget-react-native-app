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
        ...{ borderColor: Colors[scheme].primaryThird },
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 40,
          width: Dimensions.get("window").width,
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
    // borderBottomWidth: 1,
  },
});
