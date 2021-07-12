import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Input from "../input/Input";
import React from "react";
import Colors from "../../constants/Colors";
import CategoryList from "../../components/newItems/CategoryList";
import numberInputValidation from "../../functions/NumberInputValidation";

const ErrorCostValidation = () => {
  return <Text style={{ color: "red" }}> Proszę wpisać poprawną kwotę </Text>;
};

const NewElement = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.newElement}>
        <View style={styles.category}>
          <CategoryList
            onChangeCategory={props.onChangeCategory}
            category={props.category}
          />
        </View>

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
