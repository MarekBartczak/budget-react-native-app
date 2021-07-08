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
import SetNextPayDay from "../../../functions/_SetNextPayDay";
import { useDispatch, useSelector } from "react-redux";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";

const FixedExpenseDetails = (props) => {
  const { id, cost, title, date, recipient } = props.route.params;
  const dispatch = useDispatch();
  const fixedExpenseList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );
  const historyList = useSelector((state) => state.fixedExpense.history);
  const history = historyList.filter((el) => el.id === id);
  const [nextPayDay, setNextPayDay] = useState();
  const [dateInfo, setDateInfo] = useState();
  let getInfoDate;
  const expenseById = fixedExpenseList.find((el) => el.id === id);
  useEffect(() => {
    // getInfoDate = SetNextPayDay(date, { type: "MONTH", interval: 1 });
    // getInfoDate = SetNextPayDay(date);
    // getInfoDate = date.toISOString().slice(0, 10);

    setDateInfo(date.replaceAll("-", "."));
    // setNextPayDay(getInfoDate.days);
  }, [date]);

  const toArchive = () => {
    dispatch(fixedExpenseActions.archive(id));
  };
  // console.log(history);
  // console.log(fixedExpenseList);
  const showIsPaid = () => {
    if (expenseById.isPaid) {
      // return <Text style={{ fontWeight: "bold", color: "green" }}>tak</Text>;
      return <Fontisto name="checkbox-active" size={15} color="green" />;
    } else {
      // return <Text style={{ fontWeight: "bold", color: "red" }}>nie</Text>;
      return <Fontisto name="checkbox-passive" size={15} color="red" />;
    }
  };

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
              <Text style={styles.textDate}>{dateInfo}</Text>

              {/* <Text>pozostało dni: {nextPayDay} </Text> */}
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
            <TouchableOpacity onPress={() => setPaid()}>
              <Text style={{ color: Colors.primary, marginTop: 5 }}>
                zmien status
              </Text>
            </TouchableOpacity>
            {expenseById.isPaid ? archive() : null}
          </View>
        </View>
        {console.log(history)}
        <View style={styles.history}>
          <FlatList
            data={history}
            renderItem={(item) => (
              <Text>
                {item.item.title} {item.item.cost}zł {item.item.date}
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
