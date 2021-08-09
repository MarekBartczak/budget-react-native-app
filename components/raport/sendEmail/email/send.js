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
  const emailSender = () => {
    let templateForm = {
      new_date: new Date().toISOString().slice(0, 10),
      header: message.head,
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
        "<b>Stałe wpływy</b><br/>",
        message.FixedIncome,
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
    FixedIncome: useSelector((state) => state.fixedIncome.fixedIncome),
  };
  const list = filteredList(raport, listObj);
  const message = emailTemplate(list);
  //   console.log(message);
  return (
    <TouchableOpacity onPress={() => emailSender()}>
      <View style={styles.send}>
        <Feather name="send" size={24} color="black" />
        <Text style={styles.sendText}>Wyślij raport</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Send;

const styles = StyleSheet.create({
  send: {
    backgroundColor: Colors.backGround2,
    height: 60,
    width: 120,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  sendText: {
    textAlign: "center",
  },
});
