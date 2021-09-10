import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
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
          ...{
            backgroundColor: Colors[scheme].backGround,
            borderBottomColor: Colors[scheme].primary,
          },
        }}
      >
        <Text style={{ color: Colors[scheme].primarySecond, marginLeft: 20 }}>
          {props.data}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterList;

const styles = StyleSheet.create({
  element: {
    width: Dimensions.get("window").width,

    borderBottomWidth: 1,
    // shadowOffset: { height: 0, width: 0 },
    // shadowRadius: 7,
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    padding: 10,
    paddingTop: 20,
  },
});
