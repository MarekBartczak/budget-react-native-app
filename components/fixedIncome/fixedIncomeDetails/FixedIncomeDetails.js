import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import ExternalComponent from "../../ExternalComponentWithGradient/ExternalComponentWithGradient";
const FixedIncomeDetails = (props) => {
  const { id, cost, title, date, recipient } = props.route.params;

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
            <View style={styles.date}>
              <Text>Data</Text>
              <Text style={styles.textDate}>{date.replaceAll("-", ".")}</Text>
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
      </View>
    </ExternalComponent>
  );
};

export default FixedIncomeDetails;

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
  top: {
    flexDirection: "row",
    padding: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    flexDirection: "column",
    alignItems: "center",
  },
  costInfo: {
    flexDirection: "column",
    alignItems: "center",
  },
  textDate: {
    fontWeight: "bold",
  },
  textCost: {
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
