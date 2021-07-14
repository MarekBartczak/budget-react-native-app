import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import ExternalComponent from "../../ExternalComponentWithGradient/ExternalComponentWithGradient";
import Colors from "../../../constants/Colors";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import setNextPayDay from "../../../functions/SetNextPayDay";
import { useDispatch, useSelector } from "react-redux";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";

const FixedExpenseDetails = (props) => {
  const { id, cost, title, date, recipient } = props.route.params;
  const dispatch = useDispatch();
  const fixedExpenseList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );
  const history = useSelector((state) => state.fixedExpense.history);
  const historyEl = history.filter((el) => el.originId === id);
  const expenseById = fixedExpenseList.find((el) => el.id === id);
  const toArchive = () => {
    dispatch(fixedExpenseActions.archive(id));
    setPaid();
    props.navigation.goBack();
  };
  const showIsPaid = () => {
    if (expenseById.isPaid) {
      return (
        <TouchableOpacity onPress={() => setPaid()}>
          <Fontisto name="checkbox-active" size={15} color="green" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => setPaid()}>
          <Fontisto name="checkbox-passive" size={15} color="red" />
        </TouchableOpacity>
      );
    }
  };

  history.map((el) => setNextPayDay(el.date, el.interval));
  // console.log(history);
  const setPaid = () => {
    dispatch(fixedExpenseActions.isPaid(!expenseById.isPaid, id));
  };

  const archive = () => (
    <TouchableOpacity onPress={() => toArchive()}>
      <Text style={{ color: Colors.primary, marginTop: 5 }}>archiwizuj</Text>
    </TouchableOpacity>
  );

  return (
    <ExternalComponent>
      <View>
        <View style={styles.title}>
          <View style={styles.trash}></View>

          <Text style={styles.textTitle}>{title}</Text>
          <View style={styles.trash}>
            <Ionicons name="ios-trash" size={24} color={Colors.primary} />
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.top}>
            <View style={styles.paymentDate}>
              <Text>Termin zapłaty</Text>
              <Text style={styles.textDate}>{expenseById.date}</Text>
            </View>
            <View style={styles.costInfo}>
              <Text>Kwota</Text>
              <Text style={styles.textCost}>{cost}zł</Text>
            </View>
          </View>

          <View style={styles.middle}>
            <Text style={styles.textRecipient}>{recipient}</Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>Opłacony? {showIsPaid()}</Text>

            {expenseById.isPaid ? archive() : null}
          </View>
        </View>
        <View style={styles.history}>
          <FlatList
            data={historyEl}
            renderItem={(item) => (
              <Text>
                {item.item.title} {item.item.cost}zł{" "}
                {item.item.date.replaceAll("-", ".")}
              </Text>
            )}
          />
        </View>
      </View>
    </ExternalComponent>
  );
};

export default FixedExpenseDetails;

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowOffset: { height: 0, width: 10 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 40,
  },
  details: {
    backgroundColor: Colors.transparent,
    shadowOffset: { height: 0, width: 10 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 10,
    height: 200,
    marginBottom: 20,
  },
  history: {
    backgroundColor: Colors.transparent,
    shadowOffset: { height: 0, width: 10 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 10,
    height: 200,
  },
  trash: {
    alignItems: "center",
    width: 30,
  },
  textTitle: {
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },

  top: {
    flexDirection: "row",
    padding: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },

  paymentDate: {
    flexDirection: "column",
    alignItems: "center",
  },
  textCost: {
    fontWeight: "bold",
  },
  costInfo: {
    flexDirection: "column",
    alignItems: "center",
  },
  textDate: {
    fontWeight: "bold",
  },

  middle: {
    justifyContent: "center",
    alignItems: "center",
  },
  textRecipient: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
});
