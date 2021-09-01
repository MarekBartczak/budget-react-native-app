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
import uuid from "react-native-uuid";
import MultiItem from "../../models/MultiItem";
import { useNavigation } from "@react-navigation/native";
import switchComaToDot from "../../functions/switchCompaToDot";

const InputData = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
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

  const buttonComponent = () => {
    return (
      <View
        style={{
          ...styles.addToReceiptButton,
          ...{ backgroundColor: Colors[scheme].button },
        }}
      >
        <Text
          style={{
            ...styles.addToReceiptButtonText,
            ...{ color: Colors[scheme].primary },
          }}
        >
          Dodaj do paragonu
        </Text>
      </View>
    );
  };

  const addToReceiptButtonActive = () => {
    return (
      <TouchableOpacity onPress={addToReceipt}>
        {buttonComponent()}
      </TouchableOpacity>
    );
  };
  const addToReceiptButtonInactive = () => {
    return buttonComponent();
  };

  return (
    <ExternalComponent>
      <View
        style={{
          ...styles.category,
          ...{ backgroundColor: Colors[scheme].button },
        }}
      >
        <Text
          style={{
            ...styles.categoryText,
            ...{ color: Colors[scheme].primary },
          }}
        >
          {mainCategory}
        </Text>
        {/* <MaterialCommunityIcons
          name="slash-forward"
          size={24}
          color={Colors[scheme].primary}
        /> */}
        <Text
          style={{
            ...styles.categoryText,
            ...{ color: Colors[scheme].primary },
          }}
        >
          {subCategory}
        </Text>
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              ...styles.inputViewArea,
              ...{ backgroundColor: Colors[scheme].primaryThird },
            }}
          >
            <View style={styles.inputView}>
              {/* <Text>Nazwa</Text> */}
              <Input
                style={{
                  ...styles.input,
                  ...{ color: Colors[scheme].primarySecond },
                }}
                value={itemName}
                placeholder={"Nazwa produktu"}
                keyboardType={"default"}
                onChangeText={setItemName}
              />
            </View>

            <View style={styles.inputView}>
              {/* <Text>Ilość</Text> */}
              <Input
                style={{
                  ...styles.input,
                  ...{ color: Colors[scheme].primarySecond },
                }}
                value={multiply}
                placeholder={"ilość"}
                keyboardType={"numeric"}
                onChangeText={setMultiply}
              />
            </View>

            <View style={styles.inputView}>
              {/* <Text>Kwota</Text> */}
              <Input
                style={{
                  ...styles.input,
                  ...{ color: Colors[scheme].primarySecond },
                }}
                value={cost}
                placeholder={"Kwota"}
                keyboardType={"numeric"}
                onChangeText={setCost}
              />
            </View>

            <View style={styles.validationView}>
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
  addToReceiptButton: {
    marginTop: 40,
    width: Dimensions.get("window").width * 0.6,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addToReceiptButtonText: {
    fontSize: 15,
  },

  category: {
    marginTop: 20,
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  categoryText: { fontWeight: "bold", fontSize: 14 },

  inputViewArea: {
    marginTop: 20,
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.5,
  },
  inputView: {
    width: Dimensions.get("window").width * 0.9,
    alignItems: "center",
    paddingVertical: 20,
  },
  input: {
    marginTop: 20,
    borderBottomWidth: 3,
    width: Dimensions.get("window").width * 0.6,
    fontSize: 20,
  },
  validationView: {
    height: 50,
  },

  // nameAndMultiplyTextView: {
  //   marginTop: 40,
  //   width: Dimensions.get("window").width * 0.9,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 10,
  //   // backgroundColor: Colors.accent,
  //   borderTopLeftRadius: 10,
  //   borderTopRightRadius: 10,
  //   paddingTop: 3,
  // },
  // NameAndMultiply: {
  //   flexDirection: "row",
  //   width: Dimensions.get("window").width * 0.9,
  //   borderBottomLeftRadius: 10,
  //   borderBottomRightRadius: 10,
  //   justifyContent: "space-between",
  //   // backgroundColor: Colors.accent,
  // },
  // newElement: {
  //   alignItems: "center",
  //   width: Dimensions.get("window").width,
  //   marginBottom: 20,
  // },
  // amountText: {
  //   paddingHorizontal: 10,
  // },
  // amountInput: {
  //   marginTop: 40,
  //   borderRadius: 10,

  //   width: Dimensions.get("window").width * 0.9,
  //   // backgroundColor: Colors.accent,
  // },

  // inputs: {
  //   alignItems: "center",
  //   width: Dimensions.get("window").width * 0.9,
  // },
  // input: {
  //   textAlign: "center",
  //   height: 40,
  //   fontSize: 20,
  //   width: 200,
  //   borderBottomWidth: 3,
  //   backgroundColor: Colors.accent,
  //   fontWeight: "bold",
  //   margin: 5,
  //   margin: 10,
  //   color: "black",
  //   borderColor: Colors.primary,
  // },
  // multiply: {
  //   backgroundColor: Colors.accent,

  //   textAlign: "center",
  //   height: 40,
  //   fontSize: 20,
  //   width: 50,
  //   borderBottomWidth: 3,
  //   fontWeight: "bold",
  //   margin: 5,
  //   margin: 10,
  //   color: "black",
  //   borderColor: Colors.primary,
  // },
  // category: {
  //   backgroundColor: Colors.accent,
  //   width: Dimensions.get("window").width * 0.9,
  //   borderRadius: 10,
  //   height: 50,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // inner: {
  //   overflow: "hidden",
  //   height: 40,
  //   width: Dimensions.get("window").width * 0.85,
  //   borderWidth: 3,
  //   borderColor: Colors.gradientBackground.third,
  //   borderRadius: 10,

  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
