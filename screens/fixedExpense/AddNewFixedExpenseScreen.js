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
  const scheme = useSelector((state) => state.config.scheme);
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
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const newFixedExpense = () => {
    const obj = new FixedExpense(
      uuid.v4(),
      date.toISOString().slice(0, 10),
      null,
      title,
      recipient,
      false,
      Number(switchComaToDot(cost)),
      interval.value,
      description,
      []
    );

    return obj;
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
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    ...styles.inputView,
                    ...{ borderColor: Colors[scheme].primary },
                  }}
                >
                  <Input
                    style={{
                      ...styles.input,
                      ...{
                        color: Colors[scheme].primarySecond,
                      },
                    }}
                    value={cost}
                    placeholder={"Kwota"}
                    keyboardType={"numeric"}
                    onChangeText={setCost}
                    placeholderTextColor={Colors[scheme].primarySecond}
                  />
                  <Input
                    style={{
                      ...styles.input,
                      ...{
                        color: Colors[scheme].primarySecond,
                      },
                    }}
                    value={title}
                    placeholder={"Tytuł"}
                    keyboardType={"default"}
                    onChangeText={setTitle}
                    placeholderTextColor={Colors[scheme].primarySecond}
                  />
                  <Input
                    style={{
                      ...styles.input,
                      ...{
                        color: Colors[scheme].primarySecond,
                      },
                    }}
                    value={recipient}
                    placeholder={"Odbiorca"}
                    keyboardType={"default"}
                    onChangeText={setRecipient}
                    placeholderTextColor={Colors[scheme].primarySecond}
                  />
                  <Input
                    style={{
                      ...styles.descriptionInput,
                      ...{
                        color: Colors[scheme].primaryThird,
                      },
                    }}
                    placeholder={"Opis"}
                    multiline
                    numberOfLines={3}
                    keyboardType={"default"}
                    onChangeText={setDescription}
                    placeholderTextColor={Colors[scheme].primarySecond}
                  />
                </View>
                <View
                  style={{
                    ...styles.datePickerView,
                    ...{ borderColor: Colors[scheme].primary },
                  }}
                >
                  <DatePicker
                    date={date}
                    onChange={onChangeDate}
                    maxDate={null}
                  />
                </View>
                <View
                  style={{
                    ...styles.interval,
                    ...{ backgroundColor: Colors[scheme].light },
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      // marginTop: -10,
                      // backgroundColor: Colors.accent,
                      width: 150,
                      color: Colors[scheme].primarySecond,
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
                          <View
                            style={{
                              ...styles.intervalListElement,
                              // ...{
                              // color: Colors[scheme].primarySecond,
                              // },
                            }}
                          >
                            <Text
                              style={
                                interval.id === item.item.id
                                  ? {
                                      ...styles.selectedIntervalText,
                                      ...{
                                        color: Colors[scheme].button,
                                      },
                                    }
                                  : {
                                      ...styles.intervalText,
                                      ...{
                                        color: Colors[scheme].primarySecond,
                                      },
                                    }
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
                    style={{
                      width: Dimensions.get("window").width * 0.5,
                      height: Dimensions.get("screen").height * 0.05,
                      shadowColor: "black",
                      shadowOffset: { height: 0, width: 0 },
                      shadowOpacity: 0.25,
                      shadowRadius: 5,
                      borderRadius: 3,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20,
                    }}
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
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerView: {
    marginTop: 20,

    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    borderBottomWidth: 1,
  },

  defaultText: {
    fontWeight: "bold",
  },
  inputView: {
    marginTop: 10,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    borderBottomWidth: 1,
  },
  input: {
    height: 25,
    width: Dimensions.get("window").width * 0.8,
    borderBottomWidth: 1,
    margin: 5,
    margin: 10,
  },
  descriptionInput: {
    height: 50,
    width: Dimensions.get("window").width * 0.8,
    borderBottomWidth: 1,
    margin: 5,
    margin: 10,
  },
  buttonView: {
    // marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  interval: {
    marginTop: 20,
    // backgroundColor: Colors.light.primaryThird,
    width: Dimensions.get("window").width * 0.9,
    // height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    padding: 10,

    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },

  intervalOptions: {
    marginTop: 20,
    // alignItems: "flex-start",
    // backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  intervalListElement: {
    marginVertical: 2,
    // marginLeft: 10,
    width: Dimensions.get("window").width * 0.8,
    // width: "100%",
    paddingLeft: 20,
    height: 21,
  },

  intervalText: {
    fontSize: 17,
    fontFamily: "Kanit_400Regular",
  },
  selectedIntervalText: {
    fontSize: 17,
    fontFamily: "Kanit_400Regular",
  },
});
