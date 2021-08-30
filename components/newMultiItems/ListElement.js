import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";

const ListElement = (props) => {
  return (
    <View style={styles.ListElement}>
      <View style={styles.item}>
        <View style={styles.textStyle}>
          <Text style={styles.itemName}>
            {props.itemName}{" "}
            <Text style={styles.multiply}> [x{props.multiply}]</Text>
          </Text>
          <Text style={styles.category}>{props.category}</Text>
        </View>
        <Text style={styles.cost}>{props.cost * props.multiply}zł</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  multiply: {
    fontWeight: "normal",
  },
  ListElement: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    fontSize: 9,
  },
  textStyle: { flexDirection: "column" },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(190,190,190)",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginVertical: 3,
  },
  itemName: {
    fontWeight: "bold",
  },
});

export default ListElement;
