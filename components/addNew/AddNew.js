import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import Input from "../input/Input";
import DatePicker from "../../components/DatePicker";
import Button from "../../components/buttons/Button";
import * as configActions from "../../store/actions/config";
import { useSelector, useDispatch } from "react-redux";

const AddNewComponent = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  // const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardShow
    );
    const keyboardHideListener = Keyboard.addListener(
      "keyboardDidHide",
      kedyboardHide
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  });

  const keyboardShow = () =>
    dispatch(configActions.addIncomeKeyboardStatus(true));
  const kedyboardHide = () =>
    dispatch(configActions.addIncomeKeyboardStatus(false));

  // console.log(keyboardStatus);
  return (
    <KeyboardAvoidingView
      // behavior={"position"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Dimensions.get("window").height < 670 ? 60 : -100}
      enabled
    >
      <View style={styles.AddNewComponent}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <View
              style={{
                ...styles.datePickerView,
                ...{ borderColor: Colors[scheme].primary },
              }}
            >
              <DatePicker
                date={props.date}
                onChange={props.onChangeDate}
                maxDate={null}
              />
            </View>
            <View
              style={{
                ...styles.inputView,
                ...{ borderColor: Colors[scheme].primary },
              }}
            >
              <Input
                style={{
                  ...styles.input,
                  ...{ color: Colors[scheme].primarySecond },
                }}
                value={props.amountValue}
                placeholder={props.placeHolderAmount}
                keyboardType={"numeric"}
                onChangeText={props.setAmountValue}
              />
              <Input
                style={{
                  ...styles.input,
                  ...{ color: Colors[scheme].primarySecond },
                }}
                value={props.nameValue}
                placeholder={props.placeHolderName}
                keyboardType={"default"}
                onChangeText={props.setNameValue}
              />
              <Input
                style={{
                  ...styles.input,
                  ...{ color: Colors[scheme].primarySecond },
                }}
                value={props.contractor}
                placeholder={props.placeHolderContractor}
                keyboardType={"default"}
                onChangeText={props.setContractor}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                onPress={props.save}
                text="Zapisz"
                style={{
                  width: Dimensions.get("window").width * 0.5,
                  height: Dimensions.get("screen").height * 0.05,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddNewComponent;

const styles = StyleSheet.create({
  AddNewComponent: {
    width: Dimensions.get("window").width,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerView: {
    marginBottom: 10,
    borderBottomWidth: 1,
  },

  descriptionComponent: {
    marginLeft: 10,

    alignItems: "center",
  },
  defaultText: {
    fontWeight: "bold",
  },
  inputView: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  input: {
    height: 25,
    width: 200,
    borderBottomWidth: 1,
    margin: 10,
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
