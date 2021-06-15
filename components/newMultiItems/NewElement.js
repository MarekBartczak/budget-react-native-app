import { StyleSheet, Text, View } from "react-native";
import Input from "../newItems/Input";
import React, { useState } from "react";
import Colors from "../../constants/Colors";

const NewElement = (props) => {
  //   const [itemName, setItemName] = useState("");
  //   const [cost, setCost] = useState("");
  return (
    <View style={styles.newElement}>
      <View style={styles.inputs}>
        <Input
          style={styles.input}
          value={props.itemName}
          placeholder={"Nazwa produktu"}
          keyboardType={"default"}
          onChangeText={props.onSetName}
        />
        <Input
          style={styles.input}
          value={props.cost}
          placeholder={"Kwota"}
          keyboardType={"numeric"}
          onChangeText={props.onSetCost}
        />
      </View>
    </View>
  );
};

export default NewElement;

const styles = StyleSheet.create({
  newElement: {
    alignItems: "center",
  },
  inputs: {
    alignItems: "center",
  },
  input: {
    textAlign: "center",
    height: 40,
    fontSize: 20,
    width: 200,
    borderBottomWidth: 3,
    fontWeight: "bold",
    margin: 5,
    margin: 10,
    color: Colors.primary,
    borderColor: Colors.primary,
  },
});
