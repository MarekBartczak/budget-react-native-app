import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import * as intemActions from "../../../store/actions/income";
import { useDispatch, useSelector } from "react-redux";

import ExternalComponent from "../../ExternalComponentWithGradient/ExternalComponentWithGradient";
const IncomeDetails = (props) => {
  const userId = useSelector((state) => state.auth.userID);

  const { id, cost, title, date, recipient } = props.route.params;
  const dispatch = useDispatch();

  const removeIncome = () => {
    dispatch(intemActions.delItem(id, userId));
    props.navigation.navigate("Income");
  };
  return (
    <ExternalComponent>
      <View>
        <View style={styles.title}>
          <View style={styles.trash}></View>

          <Text style={styles.textTitle}>{title}</Text>
          <View style={styles.trash}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Uwaga!",
                  "Czy usunąć?",
                  [
                    { text: "Nie", style: "cancel" },
                    { text: "Tak", onPress: () => removeIncome() },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Ionicons name="ios-trash" size={24} color={Colors.primary} />
            </TouchableOpacity>
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

export default IncomeDetails;

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
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
