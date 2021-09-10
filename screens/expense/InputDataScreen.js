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
  const mainCategory = useSelector((state) => state.item.category.main);
  const subCategory = useSelector((state) => state.item.category.sub);

  const dispatch = useDispatch();

  const ErrorCostValidation = () => {
    return <Text style={{ color: "red" }}> Proszę wpisać poprawną kwotę </Text>;
  };

  const checkFilledForm = () => {
    if (cost != "" && numberInputValidation(cost)) {
      return true;
    }
  };
  const clearState = () => {
    setCost("");
  };
  addToReceipt = () => {
    const itemObj = new MultiItem(
      uuid.v4(),
      mainCategory,
      subCategory,
      Number(switchComaToDot(cost))
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
          ...{ backgroundColor: Colors[scheme].primary },
        }}
      >
        <Text
          style={{
            ...styles.addToReceiptButtonText,
            ...{ color: Colors[scheme].button },
          }}
        >
          {"Dodaj do paragonu".toUpperCase()}
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
          ...{ borderColor: Colors[scheme].primary },
        }}
      >
        <Text
          style={{
            ...styles.categoryText,
            ...{ color: Colors[scheme].primarySecond, fontSize: 16 },
          }}
        >
          {mainCategory.toUpperCase()}
        </Text>

        <Text
          style={{
            ...styles.categoryText,
            ...{
              color: Colors[scheme].primarySecond,
              fontSize: 12,
              marginBottom: 5,
            },
          }}
        >
          {subCategory.toUpperCase()}
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
              ...{ borderColor: Colors[scheme].primary },
            }}
          >
            <View style={styles.inputView}>
              <Input
                style={{
                  ...styles.input,
                  ...{
                    color: Colors[scheme].primarySecond,
                    borderColor: Colors[scheme].button,
                    paddingBottom: 10,
                  },
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
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  addToReceiptButtonText: {
    fontSize: 15,
    fontFamily: "Kanit_600SemiBold",
  },

  category: {
    marginTop: 10,
    width: Dimensions.get("window").width,
    borderBottomWidth: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  categoryText: {
    fontWeight: "bold",
    fontFamily: "Kanit_600SemiBold",
  },

  inputViewArea: {
    borderBottomWidth: 1,
    marginTop: 20,
    alignItems: "center",
    width: Dimensions.get("window").width,
    borderRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.5,
  },
  inputView: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    paddingVertical: 20,
  },
  input: {
    marginTop: 20,
    borderBottomWidth: 1,
    width: Dimensions.get("window").width * 0.6,
    fontSize: 20,
  },
  validationView: {
    height: 50,
  },
});
