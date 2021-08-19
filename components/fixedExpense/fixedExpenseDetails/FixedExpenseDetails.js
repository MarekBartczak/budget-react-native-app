import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import ExternalComponent from "../../ExternalComponentWithGradient/ExternalComponentWithGradient";
import Colors from "../../../constants/Colors";
import { Ionicons, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import setNextPayDay from "../../../functions/SetNextPayDay";
import { useDispatch, useSelector } from "react-redux";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";

const FixedExpenseDetails = (props) => {
  const { id, cost, title, date, recipient, isPaid } = props.route.params;
  const dispatch = useDispatch();
  const history = useSelector((state) => state.fixedExpense.history);
  const userId = useSelector((state) => state.auth.userID);

  const historyEl = history.filter((el) => el.originId === id);
  const showIsPaid = () => {
    return (
      <TouchableOpacity
        style={{
          borderColor: Colors.gradientBackground.third,
          borderWidth: 3,
          borderRadius: 10,
          padding: 5,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        onPress={() => {
          Alert.alert(
            "Uwaga!",
            "Czy opłacić?",
            [
              { text: "Nie", style: "cancel" },
              { text: "Tak", onPress: () => setPaid() },
            ],
            { cancelable: false }
          );
        }}
      >
        <MaterialCommunityIcons name="cash-register" size={34} color="black" />
      </TouchableOpacity>
    );
  };

  history.map((el) => setNextPayDay(el.date, el.interval));
  const setPaid = () => {
    dispatch(fixedExpenseActions.isPaid(!isPaid, id));
    dispatch(fixedExpenseActions.archive(id));

    props.navigation.goBack();
  };

  const removeIncome = () => {
    dispatch(fixedExpenseActions.delItem(id, userId));
    props.navigation.navigate("FixedExpense");
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
            <View style={styles.paymentDate}>
              <Text>Termin zapłaty</Text>
              <Text style={styles.textDate}>{date}</Text>
            </View>
            <View style={styles.costInfo}>
              <Text>Kwota</Text>
              <Text style={styles.textCost}>{cost}zł</Text>
            </View>
          </View>

          <View style={styles.middle}>
            <Text style={styles.textRecipient}>{recipient}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ marginRight: 20 }}>
              archiwizuj opłacony rachunek{" "}
            </Text>
            <Text>{showIsPaid()}</Text>

            {/* {isPaid ? archive() : null} */}
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
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 40,
  },
  details: {
    backgroundColor: Colors.transparent,
    borderRadius: 10,
    height: 200,
    marginBottom: 20,
  },
  history: {
    backgroundColor: Colors.transparent,
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
