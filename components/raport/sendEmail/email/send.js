import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../../../constants/Colors";
import { init } from "emailjs-com";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import filteredList from "./filteredList";
import emailTemplate from "./emailTemplate";

const Send = (props) => {
  const raport = useSelector((state) => state.raport);
  const listObj = {
    Expense: useSelector((state) => state.item.items),
    FixedExpense: useSelector((state) => state.fixedExpense.fixedExpense),
    Income: useSelector((state) => state.income.income),
    FixedIncome: useSelector((state) => state.fixedIncome.fixedIncome),
  };
  const list = filteredList(raport, listObj);
  const message = emailTemplate(list);
  console.log(message);
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.send}>
        <Feather name="send" size={24} color="black" />
        <Text style={styles.sendText}>Wyślij</Text>
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
