import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Input from "../../components/input/Input";
import { useSelector, useDispatch } from "react-redux";
import * as itemActions from "../../store/actions/items";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import Colors from "../../constants/Colors";
import numberInputValidation from "../../functions/NumberInputValidation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import MultiItem from "../../models/MultiItem";
import { useNavigation } from "@react-navigation/native";
import switchComaToDot from "../../functions/switchCompaToDot";

const InputData = (props) => {
  const navigation = useNavigation();

  const [cost, setCost] = useState("");
  const [multiply, setMultiply] = useState("");
  const [itemName, setItemName] = useState("");
  const mainCategory = useSelector((state) => state.item.category.main);
  const subCategory = useSelector((state) => state.item.category.sub);

  const dispatch = useDispatch();

  const ErrorCostValidation = () => {
    return <Text style={{ color: "red" }}> Proszę wpisać poprawną kwotę </Text>;
  };

  const checkFilledForm = () => {
    if (
      cost != "" &&
      multiply != "" &&
      itemName != "" &&
      numberInputValidation(cost)
    ) {
      return true;
    }
  };
  const clearState = () => {
    setCost("");
    setItemName("");
    setMultiply("");
  };
  addToReceipt = () => {
    const itemObj = new MultiItem(
      uuid.v4(),
      subCategory,
      itemName,
      Number(switchComaToDot(cost)),
      multiply
    );
    dispatch(itemActions.addItemToTheReceipt(itemObj));
    clearState();
    navigation.navigate("AddMultipleItem");
  };

  const addToReceiptButtonActive = () => {
    return (
      <TouchableOpacity onPress={addToReceipt}>
        <View style={styles.addButton}>
          <View style={styles.innerButton}>
            <Entypo name="add-to-list" size={54} color="green" />
            <Text>Dodaj do paragonu</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const addToReceiptButtonInactive = () => {
    return (
      <View style={styles.addButton}>
        <View style={styles.innerButton}>
          <Entypo name="add-to-list" size={54} color={Colors.primary} />
          <Text>Dodaj do paragonu</Text>
        </View>
      </View>
    );
  };

  return (
    <ExternalComponent>
      <View style={styles.category}>
        <View style={styles.inner}>
          <Text>{mainCategory}</Text>
          <MaterialCommunityIcons
            name="slash-forward"
            size={24}
            color="black"
          />
          <Text>{subCategory}</Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.newElement}>
            <View style={styles.inputs}>
              <View style={styles.nameAndMultiplyTextView}>
                <Text>Nazwa</Text>
                <Text>Ilość</Text>
              </View>
              <View style={styles.NameAndMultiply}>
                <Input
                  style={styles.input}
                  value={itemName}
                  // placeholder={"Nazwa produktu"}
                  keyboardType={"default"}
                  onChangeText={setItemName}
                />
                <Input
                  style={styles.multiply}
                  value={multiply}
                  // placeholder={"ilość"}
                  keyboardType={"numeric"}
                  onChangeText={setMultiply}
                />
              </View>

              <View style={styles.amountInput}>
                <View style={styles.amountText}>
                  <Text>Kwota</Text>
                </View>
                <Input
                  style={styles.input}
                  value={cost}
                  // placeholder={"Kwota"}
                  keyboardType={"numeric"}
                  onChangeText={setCost}
                />
              </View>
              {!numberInputValidation(cost) ? (
                <ErrorCostValidation />
              ) : (
                <Text> </Text>
              )}
            </View>
          </View>
          {checkFilledForm()
            ? addToReceiptButtonActive()
            : addToReceiptButtonInactive()}
        </View>
      </TouchableWithoutFeedback>
    </ExternalComponent>
  );
};

export default InputData;

const styles = StyleSheet.create({
  nameAndMultiplyTextView: {
    marginTop: 40,
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: Colors.accent,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 3,
  },
  NameAndMultiply: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    // borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "space-between",
    backgroundColor: Colors.accent,
  },
  newElement: {
    alignItems: "center",
    width: Dimensions.get("window").width,
    marginBottom: 20,
    // height: Dimensions.get("window").height,
  },
  amountText: {
    paddingHorizontal: 10,
  },
  amountInput: {
    marginTop: 40,
    borderRadius: 10,

    width: Dimensions.get("window").width * 0.9,
    backgroundColor: Colors.accent,
  },
  addButton: {
    width: Dimensions.get("window").width * 0.5,
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: "black",
  },
  innerButton: {
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderColor: Colors.gradientBackground.third,
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
    backgroundColor: Colors.accent,
    fontWeight: "bold",
    margin: 5,
    margin: 10,
    color: "black",
    borderColor: Colors.primary,
  },
  multiply: {
    backgroundColor: Colors.accent,

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
  category: {
    backgroundColor: Colors.accent,
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    height: 40,
    width: Dimensions.get("window").width * 0.85,
    borderWidth: 3,
    borderColor: Colors.gradientBackground.third,
    borderRadius: 10,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
