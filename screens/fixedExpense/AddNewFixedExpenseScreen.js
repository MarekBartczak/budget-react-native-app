import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import FixedExpense from "../../models/FixedExpense";
import uuid from "react-native-uuid";
import DatePicker from "../../components/DatePicker";
import Input from "../../components/input/Input";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fixedExpenseActions from "../../store/actions/fixedExpense";
import validateChecker from "../../components/undefinedListCheck/ValidateChecker";
import Colors from "../../constants/Colors";
import ExternalComponentWithGradient from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import saveDataToTheCloud from "../../functions/cloud/saveDataToTheCloud";
import switchComaToDot from "../../functions/switchCompaToDot";
import numberInputValidation from "../../functions/NumberInputValidation";
const AddNewFixedExpenseScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [cost, setCost] = useState();
  const [title, setTitle] = useState();
  const [recipient, setRecipient] = useState();
  const [interval, setInterval] = useState("");
  const [description, setDescription] = useState("");
  const userId = useSelector((state) => state.auth.userID);

  const intervalPath = {
    "7days": {
      light: require("../../assets/interval/inverval_7days_light.png"),
      dark: require("../../assets/interval/inverval_7days_dark.png"),
      light_Gold: require("../../assets/interval/inverval_7days_light_Gold.png"),
      light_Pink: require("../../assets/interval/inverval_7days_light_Pink.png"),
      light_Blue: require("../../assets/interval/inverval_7days_light_Blue.png"),
      value: { days: 7, months: 0, years: 0 },
    },
    "10days": {
      light: require("../../assets/interval/inverval_10days_light.png"),
      dark: require("../../assets/interval/inverval_10days_dark.png"),
      light_Gold: require("../../assets/interval/inverval_10days_light_Gold.png"),
      light_Pink: require("../../assets/interval/inverval_10days_light_Pink.png"),
      light_Blue: require("../../assets/interval/inverval_10days_light_Blue.png"),
      value: { days: 10, months: 0, years: 0 },
    },
    "1month": {
      light: require("../../assets/interval/inverval_1month_light.png"),
      dark: require("../../assets/interval/inverval_1month_dark.png"),
      light_Gold: require("../../assets/interval/inverval_1month_light_Gold.png"),
      light_Pink: require("../../assets/interval/inverval_1month_light_Pink.png"),
      light_Blue: require("../../assets/interval/inverval_1month_light_Blue.png"),
      value: { days: 0, months: 1, years: 0 },
    },
    "1quarter": {
      light: require("../../assets/interval/inverval_1quarter_light.png"),
      dark: require("../../assets/interval/inverval_1quarter_dark.png"),
      light_Gold: require("../../assets/interval/inverval_1quarter_light_Gold.png"),
      light_Pink: require("../../assets/interval/inverval_1quarter_light_Pink.png"),
      light_Blue: require("../../assets/interval/inverval_1quarter_light_Blue.png"),
      value: { days: 0, months: 3, years: 0 },
    },
    "1year": {
      light: require("../../assets/interval/inverval_1year_light.png"),
      dark: require("../../assets/interval/inverval_1year_dark.png"),
      light_Gold: require("../../assets/interval/inverval_1year_light_Gold.png"),
      light_Pink: require("../../assets/interval/inverval_1year_light_Pink.png"),
      light_Blue: require("../../assets/interval/inverval_1year_light_Blue.png"),
      value: { days: 0, months: 0, years: 1 },
    },
  };
  const intervalImage = (type, path) => {
    return (
      <TouchableOpacity onPress={() => setInterval(path[type].value)}>
        <Image
          source={path[type][scheme]}
          style={{
            height: Dimensions.get("window").width / 7,
            width: Dimensions.get("window").width / 7,

            borderColor: Colors[scheme].button,
            borderWidth:
              path[type].value.days === interval.days &&
              path[type].value.months === interval.months &&
              path[type].value.years === interval.years
                ? 2
                : 0,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
    );
  };

  const ErrorCostValidation = () => {
    if (cost === undefined) {
      return null;
    } else {
      return (
        <Text
          style={{
            color: "rgb(255,1,1)",
            fontSize: 10,
            backgroundColor: "rgb(255,255,255)",
            padding: 2,
            paddingHorizontal: 10,
            borderRadius: 10,
            overflow: "hidden",
            fontFamily: "Kanit_600SemiBold",
          }}
        >
          {" "}
          Proszę wpisać poprawną kwotę{" "}
        </Text>
      );
    }
  };

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
      interval,
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
          enabled
        >
          <View style={styles.AddNewComponent}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    ...styles.inputView,
                    ...{
                      backgroundColor: Colors[scheme].backGroundOne,
                      shadowColor: Colors[scheme].drawerActive,
                    },
                  }}
                >
                  <Input
                    style={{
                      ...styles.input,
                      ...{
                        color: Colors[scheme].headerTintColor,
                        backgroundColor: Colors[scheme].backGroundOneDarkness,
                        shadowColor: Colors[scheme].headerTintColor,
                      },
                    }}
                    value={cost}
                    placeholder={"Kwota"}
                    keyboardType={"numeric"}
                    onChangeText={setCost}
                    placeholderTextColor={Colors[scheme].headerTintColor}
                  />
                  {cost !== "" &&
                    !numberInputValidation(switchComaToDot(cost)) && (
                      <ErrorCostValidation />
                    )}
                  <Input
                    style={{
                      ...styles.input,
                      ...{
                        color: Colors[scheme].headerTintColor,
                        backgroundColor: Colors[scheme].backGroundOneDarkness,
                        shadowColor: Colors[scheme].headerTintColor,
                      },
                    }}
                    value={title}
                    placeholder={"Tytuł"}
                    keyboardType={"default"}
                    onChangeText={setTitle}
                    placeholderTextColor={Colors[scheme].headerTintColor}
                  />
                  <Input
                    style={{
                      ...styles.input,
                      ...{
                        color: Colors[scheme].headerTintColor,
                        backgroundColor: Colors[scheme].backGroundOneDarkness,
                        shadowColor: Colors[scheme].headerTintColor,
                      },
                    }}
                    value={recipient}
                    placeholder={"Odbiorca"}
                    keyboardType={"default"}
                    onChangeText={setRecipient}
                    placeholderTextColor={Colors[scheme].headerTintColor}
                  />
                </View>
                <View
                  style={{
                    ...styles.datePickerView,
                    ...{},
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
                      width: Dimensions.get("window").width * 0.8,
                      color: Colors[scheme].primarySecond,
                      fontFamily: "Kanit_600SemiBold",
                    }}
                  >
                    {"Częstotliwość opłat".toUpperCase()}
                  </Text>
                  <View style={styles.intervalOptions}>
                    <View>{intervalImage("7days", intervalPath)}</View>
                    <View>{intervalImage("10days", intervalPath)}</View>
                    <View>{intervalImage("1month", intervalPath)}</View>
                    <View>{intervalImage("1quarter", intervalPath)}</View>
                    <View>{intervalImage("1year", intervalPath)}</View>
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  {!numberInputValidation(switchComaToDot(cost)) ? (
                    <View
                      style={{
                        ...styles.buttonView,
                        ...{ backgroundColor: Colors[scheme].primary },
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Kanit_600SemiBold",
                          fontSize: 15,
                          color: Colors[scheme].primaryThird,
                        }}
                      >
                        ZAPISZ
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={{
                        ...styles.buttonView,
                        ...{
                          backgroundColor: Colors[scheme].primary,
                          shadowColor: "black",
                          shadowOffset: { height: 0, width: 0 },
                          shadowOpacity: 0.25,
                          shadowRadius: 5,
                        },
                      }}
                      onPress={saveFixedExpense}
                    >
                      <Text
                        style={{
                          fontFamily: "Kanit_600SemiBold",
                          fontSize: 15,
                          color: Colors[scheme].button,
                        }}
                      >
                        ZAPISZ
                      </Text>
                    </TouchableOpacity>
                  )}
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
  },

  defaultText: {
    fontWeight: "bold",
  },
  inputView: {
    // marginTop: 10,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    paddingBottom: 40,
  },
  input: {
    // height: 25,
    width: Dimensions.get("window").width * 0.8,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.55,
    shadowRadius: 3,
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  descriptionInput: {
    height: 40,
    width: Dimensions.get("window").width * 0.8,
    borderBottomWidth: 1,
    margin: 5,
    margin: 10,
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",

    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("screen").height * 0.05,
  },
  interval: {
    marginTop: 20,
    // backgroundColor: Colors.light.primaryThird,
    width: Dimensions.get("window").width * 0.95,
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
    flexDirection: "row",
    // alignItems: "flex-start",
    // backgroundColor: Colors.accent,
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
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
