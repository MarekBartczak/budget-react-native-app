import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import DatePicker from "../../components/DatePicker";
import Input from "../input/Input";
import Button from "../../components/buttons/Button";

const AddNewPeriodicElement = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={"position"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Dimensions.get("window").height < 670 ? 60 : -100}
      enabled
    >
      <View style={styles.newPeriodicElement}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <View style={styles.descriptionComponent}>
              <Text style={styles.defaultText}>{props.title}</Text>
            </View>
            <View style={styles.datePickerView}>
              <DatePicker
                date={props.date}
                onChange={props.onChangeDate}
                maxDate={null}
              />
            </View>
            <View style={styles.inputView}>
              <Input
                style={styles.input}
                value={props.amountValue}
                placeholder={props.placeHolderAmount}
                keyboardType={"numeric"}
                onChangeText={props.setAmountValue}
              />
              <Input
                style={styles.input}
                value={props.nameValue}
                placeholder={props.placeHolderName}
                keyboardType={"default"}
                onChangeText={props.setNameValue}
              />
              <Input
                style={styles.input}
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
                style={{ width: Dimensions.get("window").width * 0.7 }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddNewPeriodicElement;

const styles = StyleSheet.create({
  newPeriodicElement: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.45,
    borderRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    backgroundColor: Colors.gradientBackground.third,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    backgroundColor: Colors.gradientBackground.third,
    borderRadius: 10,
    height: "95%",
    width: "95%",
    borderWidth: 3,
    borderColor: Colors.gradientBackground.primary,
    alignItems: "center",
  },
  datePickerView: { marginTop: 10 },
  descriptionComponent: {
    marginLeft: 10,
    marginTop: -10,
    backgroundColor: Colors.gradientBackground.third,
    width: 150,
    alignItems: "center",
  },
  defaultText: {
    fontWeight: "bold",
  },
  inputView: {
    alignItems: "center",
    justifyContent: "center",
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
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
