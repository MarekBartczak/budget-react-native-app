import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import ExternalComponent from "../../ExternalComponentWithGradient/ExternalComponentWithGradient";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import SetNextPayDay from "../../../functions/SetNextPayDay";

const FixedExpenseDetails = (props) => {
  const [nextPayDay, setNextPayDay] = useState();
  const [dateInfo, setDateInfo] = useState();
  const { id, cost, title, date, recipient } = props.route.params;
  let getInfoDate;
  useEffect(() => {
    getInfoDate = SetNextPayDay(date);
    setDateInfo(getInfoDate.date.replaceAll("-", "."));
    setNextPayDay(getInfoDate.days);
  }, [date]);
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
              <Text style={styles.textDate}>{dateInfo}</Text>
              <Text>pozostało dni: {nextPayDay} </Text>
            </View>
            <View style={styles.costInfo}>
              <Text>Kwota</Text>
              <Text style={styles.textCost}>{cost}zł</Text>
            </View>
          </View>

          <View style={styles.middle}>
            <Text style={styles.textRecipient}>{recipient}</Text>
          </View>
        </View>

        <View style={styles.history}>
          <Text> historia</Text>
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
