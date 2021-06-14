import { StyleSheet, Text, View } from "react-native";
import Input from "../newItems/Input";
import React, { useState } from "react";
import Colors from "../../constants/Colors";

const NewElement = (props) => {
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  return (
    <View style={styles.newElement}>
      <View style={styles.inputs}>
        <Input
          style={styles.input}
          value={itemName}
          placeholder={"Nazwa produktu"}
          keyboardType={"default"}
          onChange={setItemName}
        />
        <Input
          style={styles.input}
          value={cost}
          placeholder={"Kwota"}
          keyboardType={"numeric"}
          onChange={setCost}
        />
      </View>
    </View>
  );
};

export default NewElement;

const styles = StyleSheet.create({
  newElement: {
    alignItems: "center",
    height: "100%",
  },
  inputs: {
    alignItems: "center",
  },
  input: {
    height: 25,
    width: 200,
    borderBottomWidth: 1,
    margin: 5,
    margin: 10,
    color: Colors.primary,
    borderColor: Colors.primary,
  },
});
