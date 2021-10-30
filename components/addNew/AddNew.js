import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Colors from "../../constants/Colors";
import Input from "../input/Input";
import DatePicker from "../../components/DatePicker";
import * as configActions from "../../store/actions/config";
import { useSelector, useDispatch } from "react-redux";
import numberInputValidation from "../../functions/NumberInputValidation";
import switchComaToDot from "../../functions/switchCompaToDot";
import fontScale from "../../constants/FontScale";
import { dataLang, selectLang } from "../../lang/lang";
const AddNewComponent = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };

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

  const ErrorCostValidation = () => {
    if (props.amountValue === undefined) {
      return null;
    } else {
      return (
        <Text style={{ color: "red", fontSize: 10 }}>
          {" "}
          {translate("Proszę wpisać poprawną kwotę")}{" "}
        </Text>
      );
    }
  };
  return (
    <KeyboardAvoidingView
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
                ...{},
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
                ...{
                  backgroundColor: Colors[scheme].light,
                },
              }}
            >
              <Input
                style={{
                  ...styles.input,
                  ...{
                    color: Colors[scheme].primarySecond,
                    backgroundColor: Colors[scheme].primary,
                    shadowColor: Colors[scheme].drawerActive,
                    fontSize: fontScale(6),
                  },
                }}
                value={props.amountValue}
                placeholder={props.placeHolderAmount}
                keyboardType={"numeric"}
                onChangeText={props.setAmountValue}
                placeholderTextColor={Colors[scheme].primarySecond}
              />

              {props.amountValue !== "" &&
                !numberInputValidation(switchComaToDot(props.amountValue)) && (
                  <ErrorCostValidation />
                )}
              <Input
                style={{
                  ...styles.input,
                  ...{
                    color: Colors[scheme].primarySecond,
                    backgroundColor: Colors[scheme].primary,
                    shadowColor: Colors[scheme].drawerActive,
                    fontSize: fontScale(6),
                  },
                }}
                value={props.nameValue}
                placeholder={props.placeHolderName}
                keyboardType={"default"}
                onChangeText={props.setNameValue}
                placeholderTextColor={Colors[scheme].primarySecond}
              />
              <Input
                style={{
                  ...styles.input,
                  ...{
                    color: Colors[scheme].primarySecond,
                    backgroundColor: Colors[scheme].primary,
                    shadowColor: Colors[scheme].drawerActive,
                    fontSize: fontScale(6),
                  },
                }}
                value={props.contractor}
                placeholder={props.placeHolderContractor}
                keyboardType={"default"}
                onChangeText={props.setContractor}
                placeholderTextColor={Colors[scheme].primarySecond}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              {!numberInputValidation(switchComaToDot(props.amountValue)) ? (
                <View
                  style={{
                    ...styles.buttonView,
                    ...{ backgroundColor: Colors[scheme].primary },
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Kanit_600SemiBold",
                      fontSize: fontScale(8),
                      color: Colors[scheme].primaryThird,
                    }}
                  >
                    {translate("ZAPISZ").toUpperCase()}
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
                      elevation: 7,
                    },
                  }}
                  onPress={props.save}
                >
                  <Text
                    style={{
                      fontFamily: "Kanit_600SemiBold",
                      fontSize: fontScale(8),
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
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 7,

    // paddingBottom: 10,
    borderRadius: 10,
    padding: 5,
  },
  input: {
    width: Dimensions.get("window").width * 0.8,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    margin: 5,
    // marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 7,
  },
  buttonView: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",

    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("screen").height * 0.05,
  },
});
