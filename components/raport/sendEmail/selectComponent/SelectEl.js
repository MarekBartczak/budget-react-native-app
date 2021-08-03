import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Colors from "../../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import React, { useState } from "react";
const SelectEl = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const showDatePicker = (isSelected) => {
    const list = props.dateList;
    if (isSelected) {
      return (
        <View>
          <FlatList
            style={styles.list}
            data={list}
            renderItem={(item) => (
              <TouchableOpacity style={styles.item} onPress={() => {}}>
                <View style={styles.el}>
                  <Ionicons name={"radio-button-off"} size={15} color="black" />
                  <Text style={styles.textDate}>{item.item}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(key) => key}
          />
        </View>
      );
    }
    return;
  };

  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
        <View style={styles.select}>
          <Ionicons
            name={isSelected ? "radio-button-on" : "radio-button-off"}
            size={15}
            color="black"
          />
          <Text style={styles.textName}> {props.name}</Text>
        </View>
      </TouchableOpacity>
      {showDatePicker(isSelected)}
    </View>
  );
};

export default SelectEl;

const styles = StyleSheet.create({
  select: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: Colors.default,
  },
  el: {
    flexDirection: "row",
    alignItems: "center",
  },
  textName: {
    fontSize: 10,
  },
  textDate: {
    fontSize: 8,
  },
  item: {
    backgroundColor: Colors.banner,

    margin: 3,
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  list: {
    height: 50,
  },
  button: {},
});
