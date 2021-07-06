import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../../constants/Colors";
import DatePicker from "../../../components/DatePicker";
import Input from "../../../components/newItems/Input";
import Button from "../../../components/buttons/Button";
import uuid from "react-native-uuid";
import Expense from "../../../models/Expense";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";
import { useDispatch } from "react-redux";
import switchComaToDot from "../../../functions/switchCompaToDot";
const AddNewFixedExpenseComponent = (props) => {
  const [date, setDate] = useState(new Date());
  const [cost, setCost] = useState();
  const [title, setTitle] = useState();
  const [recipient, setRecipient] = useState();

  const dispatch = useDispatch();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const newFixedExpense = () => {
    return new Expense(
      uuid.v4(),
      date.toISOString().slice(0, 10),
      title,
      recipient,
      Number(switchComaToDot(cost))
    );
  };

  const saveFixedExpense = () => {
    dispatch(fixedExpenseActions.addCost(newFixedExpense()));
  };
  // useEffect(() => {
  //   Keyboard.addListener("keyboardDidShow", setKeyboardDidShow);
  //   Keyboard.addListener("keyboardDidHide", setKeyboardDidHide);

  //   return () => {
  //     Keyboard.removeAllListeners("keyboardDidShow");
  //     Keyboard.removeAllListeners("keyboardDidHide");
  //   };
  // });

  // const [keyboardStatus, setKeyboardStatus] = useState(false);
  // const setKeyboardDidHide = () => setKeyboardStatus(false);
  // const setKeyboardDidShow = () => setKeyboardStatus(true);

  return (
    <KeyboardAvoidingView
      behavior={"position"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Dimensions.get("window").height < 670 ? 60 : -100}
      enabled
    >
      <View style={styles.addNewFixedExpenseComponent}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <View style={styles.descriptionComponent}>
              <Text style={styles.textDefault}>Nowy stały wydatek</Text>
            </View>
            <View>
              <DatePicker date={date} onChange={onChangeDate} maxDate={null} />
            </View>
            <View style={styles.inputView}>
              <Input
                style={styles.input}
                value={cost}
                placeholder="kwota"
                keyboardType={"numeric"}
                onChangeText={setCost}
              />
              <Input
                style={styles.input}
                value={title}
                placeholder="nazwa"
                keyboardType={"default"}
                onChangeText={setTitle}
              />
              <Input
                style={styles.input}
                value={recipient}
                placeholder="odbiorca"
                keyboardType={"default"}
                onChangeText={setRecipient}
              />
              <View style={styles.buttonView}>
                <Button
                  onPress={() => saveFixedExpense()}
                  text="Zapisz"
                  style={{ width: Dimensions.get("window").width * 0.7 }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddNewFixedExpenseComponent;

const styles = StyleSheet.create({
  addNewFixedExpenseComponent: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.45,
    backgroundColor: Colors.gradientBackground.third,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addNewFixedExpenseComponentShowKeyboard: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    marginTop: 0,
    backgroundColor: Colors.gradientBackground.third,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 10,
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
  },
  descriptionComponent: {
    marginLeft: 10,
    marginTop: -10,
    backgroundColor: Colors.gradientBackground.third,
    width: 150,
    alignItems: "center",
  },
  textDefault: {
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
