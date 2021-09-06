import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Input from "../input/Input";
import DatePicker from "../../components/DatePicker";
import Button from "../../components/buttons/Button";
import { useSelector } from "react-redux";

const AddNewComponent = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <KeyboardAvoidingView
      behavior={"position"}
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
                ...{ backgroundColor: Colors[scheme].primaryThird },
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
                ...{ backgroundColor: Colors[scheme].primaryThird },
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
              {/* <Button
                onPress={props.save}
                text="Zapisz"
                style={{ width: Dimensions.get("window").width * 0.7 }}
              /> */}
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
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerView: {
    marginBottom: 10,
    borderRadius: 10,
  },

  descriptionComponent: {
    marginLeft: 10,

    alignItems: "center",
  },
  defaultText: {
    fontWeight: "bold",
  },
  inputView: {
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 25,
    width: 200,
    borderBottomWidth: 1,
    margin: 10,
  },
  buttonView: {
    // margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
