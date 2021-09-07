import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Input from "../input/Input";
import React from "react";
import Colors from "../../constants/Colors";

const ErrorCostValidation = () => {
  return <Text style={{ color: "red" }}> Proszę wpisać poprawną kwotę </Text>;
};
{
}

const NewElement = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.newElement}>
        <View style={styles.category}></View>

        <View style={styles.inputs}>
          <View style={{ flexDirection: "row" }}>
            <Input
              style={styles.input}
              value={props.itemName}
              placeholder={"Nazwa produktu"}
              keyboardType={"default"}
              onChangeText={props.onSetName}
            />
            <Input
              style={styles.multiply}
              value={props.multiply}
              placeholder={"ilość"}
              keyboardType={"numeric"}
              onChangeText={props.onSetMultiply}
            />
          </View>

          <Input
            style={styles.input}
            value={props.cost}
            placeholder={"Kwota"}
            keyboardType={"numeric"}
            onChangeText={props.onSetCost}
          />
          {!numberInputValidation(props.cost) && <ErrorCostValidation />}
          <Text>
            [{props.category}] w miejscu [{props.place}]
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewElement;

const styles = StyleSheet.create({
  newElement: {
    alignItems: "center",
    width: "100%",
  },
  category: {
    marginVertical: 20,
    width: "100%",
  },
  inputs: {
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
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
    color: "black",
    borderColor: Colors.primary,
  },
  multiply: {
    textAlign: "center",
    height: 40,
    fontSize: 20,
    width: 50,
    borderBottomWidth: 3,
    fontWeight: "bold",
    margin: 5,
    margin: 10,
    color: "black",
    borderColor: Colors.primary,
  },
});