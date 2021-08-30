import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import FixedExpense from "../../models/FixedExpense";
import uuid from "react-native-uuid";
import DatePicker from "../../components/DatePicker";
import Input from "../../components/input/Input";
import Button from "../../components/buttons/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fixedExpenseActions from "../../store/actions/fixedExpense";
import switchComaToDot from "../../functions/switchCompaToDot";
import validateChecker from "../../components/undefinedListCheck/ValidateChecker";
import Colors from "../../constants/Colors";
import ExternalComponentWithGradient from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import saveDataToTheCloud from "../../functions/cloud/saveDataToTheCloud";
const AddNewFixedExpenseScreen = (props) => {
  const listOfFixedExpense = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [cost, setCost] = useState();
  const [title, setTitle] = useState();
  const [recipient, setRecipient] = useState();
  const [interval, setInterval] = useState("");
  const [description, setDescription] = useState("");
  const userId = useSelector((state) => state.auth.userID);

  const intervalList = [
    { id: "00", title: "co 10 dni", value: { days: 10, months: 0, years: 0 } },
    { id: "01", title: "co 7 dni", value: { days: 7, months: 0, years: 0 } },
    { id: "02", title: "co miesiąc", value: { days: 0, months: 1, years: 0 } },
    { id: "03", title: "co kwartał", value: { days: 0, months: 3, years: 0 } },
    { id: "04", title: "co rok", value: { days: 0, months: 0, years: 1 } },
  ];

  //   const isSelected = ()
  //   console.log(interval);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const newFixedExpense = () => {
    return new FixedExpense(
      uuid.v4(),
      date.toISOString().slice(0, 10),
      null,
      title,
      recipient,
      false,
      Number(switchComaToDot(cost)),
      interval.value,
      description
    );
  };

  const cleanState = () => {
    setDate(new Date());
    setCost();
    setTitle();
    setRecipient();
  };

  const saveFixedExpense = () => {
    const list = [title, cost, recipient];
    if (validateChecker(list) && typeof interval === "object") {
      const obj = newFixedExpense();
      dispatch(fixedExpenseActions.addCost(obj));
      saveDataToTheCloud.fixedExpense(obj, userId);
      cleanState();
      props.navigation.navigate("FixedExpense");
    } else {
      alert("dane nie zostaly uzupelnione");
    }
  };

  return (
    <ExternalComponentWithGradient>
      <View>
        <KeyboardAvoidingView
          //   behavior={"position"}
          style={{ flex: 1 }}
          //   keyboardVerticalOffset={
          //     Dimensions.get("window").height < 670 ? 60 : -100
          //   }
          enabled
        >
          <View style={styles.AddNewComponent}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.descriptionComponent}>
                <View style={styles.inputView}>
                  <Input
                    style={styles.input}
                    value={cost}
                    placeholder={"Kwota"}
                    keyboardType={"numeric"}
                    onChangeText={setCost}
                  />
                  <Input
                    style={styles.input}
                    value={title}
                    placeholder={"Tytuł"}
                    keyboardType={"default"}
                    onChangeText={setTitle}
                  />
                  <Input
                    style={styles.input}
                    value={recipient}
                    placeholder={"Odbiorca"}
                    keyboardType={"default"}
                    onChangeText={setRecipient}
                  />
                  <TextInput
                    style={styles.descriptionInput}
                    placeholder={"Opis"}
                    multiline
                    numberOfLines={3}
                    keyboardType={"default"}
                    onChangeText={setDescription}
                  />
                </View>
                <View style={styles.datePickerView}>
                  <DatePicker
                    date={date}
                    onChange={onChangeDate}
                    maxDate={null}
                  />
                </View>
                <View style={styles.interval}>
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: -10,
                      // backgroundColor: Colors.accent,
                      width: 150,
                      color: Colors.light.primarySecond,
                    }}
                  >
                    Częstotliwość opłat
                  </Text>
                  <View style={styles.intervalOptions}>
                    <FlatList
                      data={intervalList}
                      renderItem={(item) => (
                        <TouchableOpacity
                          onPress={() => setInterval(item.item)}
                        >
                          <View style={styles.intervalListElement}>
                            <Text
                              style={
                                styles[
                                  interval.id === item.item.id
                                    ? "selectedIntervalText"
                                    : "intervalText"
                                ]
                              }
                            >
                              {item.item.title}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item.title.toString()}
                    />
                  </View>
                </View>
                <View style={styles.buttonView}>
                  <Button
                    onPress={saveFixedExpense}
                    text="Zapisz"
                    style={{ width: Dimensions.get("window").width * 0.7 }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ExternalComponentWithGradient>
  );
};

export default AddNewFixedExpenseScreen;

const styles = StyleSheet.create({
  AddNewComponent: {
    // width: Dimensions.get("window").width * 0.9,
    // height: Dimensions.get("window").height * 0.45,
    // borderRadius: 10,
    // backgroundColor: Colors.gradientBackground.third,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerView: {
    width: Dimensions.get("window").width * 0.9,
    marginHorizontal: Dimensions.get("window").width * 0.05,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: Colors.light.primaryThird,
    borderRadius: 10,
    marginVertical: 10,
  },

  defaultText: {
    fontWeight: "bold",
  },
  inputView: {
    marginTop: 10,
    width: Dimensions.get("window").width * 0.9,
    marginHorizontal: Dimensions.get("window").width * 0.05,
    // marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: Colors.light.primaryThird,
    borderRadius: 10,
    // back
  },
  input: {
    height: 25,
    width: Dimensions.get("window").width * 0.8,
    borderBottomWidth: 1,
    margin: 5,
    margin: 10,
    color: Colors.primary,
    borderColor: Colors.primary,
  },
  descriptionInput: {
    height: 50,
    width: Dimensions.get("window").width * 0.8,
    borderBottomWidth: 1,
    margin: 5,
    margin: 10,
    color: Colors.primary,
    borderColor: Colors.primary,
  },
  buttonView: {
    // marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  interval: {
    // marginTop: 20,
    backgroundColor: Colors.light.primaryThird,
    width: Dimensions.get("window").width * 0.9,
    marginHorizontal: Dimensions.get("window").width * 0.05,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },

  intervalOptions: {
    // alignItems: "flex-start",
    // backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  intervalListElement: {
    marginVertical: 2,
    backgroundColor: Colors.light.primary,
    // marginLeft: 10,
    width: Dimensions.get("window").width * 0.8,
    // width: "100%",
    paddingLeft: 20,
    height: 21,
  },
  selectetIntervalListElement: {
    marginVertical: 2,
    backgroundColor: Colors.light.primary,
    marginLeft: 10,
    width: Dimensions.get("window").width * 0.6,
    paddingLeft: 20,
    height: 21,
  },
  intervalText: {
    fontSize: 17,
  },
  selectedIntervalText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
