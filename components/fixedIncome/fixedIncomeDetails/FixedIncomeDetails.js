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
import ExternalComponent from "../../ExternalComponentWithGradient/ExternalComponentWithGradient";
import * as fixedIncomeAction from "../../../store/actions/fixedIncome";
import { useDispatch, useSelector } from "react-redux";

const FixedIncomeDetails = (props) => {
  const { id, cost, title, date, recipient } = props.route.params;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userID);

  const removeIncome = () => {
    dispatch(fixedIncomeAction.delItem(id, userId));
    props.navigation.navigate("FixedIncome");
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
              <Ionicons
                name="ios-trash"
                size={24}
                color={Colors.light.primary}
              />
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

export default FixedIncomeDetails;

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: Colors.light.button,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 40,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  trash: {
    alignItems: "center",
    width: 30,
  },
  textTitle: {
    textAlign: "center",
    color: Colors.light.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  details: {
    backgroundColor: Colors.light.primaryThird,
    borderRadius: 10,
    height: 200,
    marginBottom: 20,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
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
