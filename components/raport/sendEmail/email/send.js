import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../../../constants/Colors";
import * as emailjs from "emailjs-com";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import filteredList from "./filteredList";
import emailTemplate from "./emailTemplate";

const Send = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const email = useSelector((state) => state.auth.userEmail);
  const emailSender = () => {
    let templateForm = {
      new_date: new Date().toISOString().slice(0, 10),
      header: message.head,
      recipient: email,
      message: [
        "<b>Wydatki</b><br/>",
        message.Expense,
        "<hr>",
        "<b>Stałe wydatki</b><br/>",
        message.FixedExpense,
        "<hr>",
        "<b>Wpływy</b><br/>",
        message.Income,
        "<hr>",
      ].join(""),
      footer: message.footer,
    };
    const service_id = "service_y6p8h4i";
    const service_template = "template_yy2v91e";
    const service_user = "user_8M89hEsl6TJjpKWX3rQDS";

    emailjs
      .send(service_id, service_template, templateForm, service_user)
      .then((res) => alert("wiadomość wysłana"))
      .catch((err) => console.log(err));
  };

  const raport = useSelector((state) => state.raport);
  const listObj = {
    Expense: useSelector((state) => state.item.items),
    FixedExpense: useSelector((state) => state.fixedExpense.fixedExpense),
    Income: useSelector((state) => state.income.income),
  };
  const list = filteredList(raport, listObj);
  const message = emailTemplate(list);
  return (
    <TouchableOpacity onPress={() => emailSender()}>
      <View
        style={{
          ...styles.send,
          ...{
            backgroundColor: Colors[scheme].primary,
            shadowColor: "black",
            shadowOffset: { height: 0, width: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
          },
        }}
      >
        <Text
          style={{
            ...styles.sendText,
            ...{
              color: Colors[scheme].button,
              fontFamily: "Kanit_600SemiBold",
            },
          }}
        >
          {"Wyślij raport".toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Send;

const styles = StyleSheet.create({
  send: {
    width: Dimensions.get("screen").width * 0.5,
    height: Dimensions.get("screen").height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  sendText: {
    textAlign: "center",
  },
});
