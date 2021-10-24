import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import ExternalComponent from "../../ExternalComponentWithGradient/ExternalComponentWithGradient";
import Colors from "../../../constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import setNextPayDay from "../../../functions/SetNextPayDay";
import { useDispatch, useSelector } from "react-redux";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";

const FixedExpenseDetails = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const { id, cost, title, date, recipient, isPaid, description } =
    props.route.params;
  const dispatch = useDispatch();
  const history = useSelector((state) => state.fixedExpense.fixedExpense);
  const userId = useSelector((state) => state.auth.userID);
  const filteredHistoryEl = history.filter((el) => el.id === id);
  const historyList = filteredHistoryEl
    .filter((el) => el.history)
    .map((el) => el.history);
  let historyEl = [];
  if (historyList.length > 0) {
    historyEl = historyList[0];
  }

  const checkIfIsPaidIsCurrrentMonth = () => {
    return filteredHistoryEl[0].isPaid;
  };

  checkIfIsPaidIsCurrrentMonth();

  const showIsPaid = () => {
    if (!checkIfIsPaidIsCurrrentMonth()) {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: Colors[scheme].primary,
            borderRadius: 2,
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
            alignItems: "center",
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
          <MaterialCommunityIcons
            name="cash-register"
            size={34}
            color={Colors[scheme].button}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: Colors[scheme].primary,
            borderRadius: 2,
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="cash-register"
            size={34}
            color={Colors[scheme].primarySecond}
          />
        </View>
      );
    }
  };

  history.map((el) => setNextPayDay(el.date, el.interval));
  const setPaid = () => {
    dispatch(fixedExpenseActions.isPaid(!isPaid, id, userId));

    dispatch(fixedExpenseActions.archive(id, userId));

    props.navigation.navigate("FixedExpense");
  };

  const removeIncome = () => {
    dispatch(fixedExpenseActions.delItem(id, userId));
    props.navigation.navigate("FixedExpense");
  };

  return (
    <ExternalComponent>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            ...styles.title,
            ...{
              backgroundColor: Colors[scheme].backGroundOne,
              shadowColor: Colors[scheme].drawerActive,
            },
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                ...styles.textTitle,
                ...{
                  color: Colors[scheme].headerTintColor,
                  fontFamily: "Kanit_600SemiBold",
                },
              }}
            >
              {title.toUpperCase()}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              ...styles.trash,
              ...{ backgroundColor: Colors[scheme].primary, padding: 10 },
            }}
          >
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
                color={Colors[scheme].button}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            ...styles.details,
            ...{
              backgroundColor: Colors[scheme].light,
            },
          }}
        >
          <View style={styles.top}>
            <View style={styles.paymentDate}>
              <Text
                style={{
                  ...{
                    color: Colors[scheme].primarySecond,
                    fontFamily: "Kanit_600SemiBold",
                    color: Colors[scheme].primaryThird,
                  },
                }}
              >
                {"Termin zapłaty".toUpperCase()}
              </Text>
              <Text
                style={{
                  ...styles.textDate,
                  ...{
                    color: Colors[scheme].primarySecond,
                    fontFamily: "Kanit_400Regular",
                  },
                }}
              >
                {date.replace(/-/g, ".")}
              </Text>
            </View>
            <View style={styles.costInfo}>
              <Text
                style={{
                  ...{
                    color: Colors[scheme].primaryThird,
                    fontFamily: "Kanit_600SemiBold",
                  },
                }}
              >
                {"Kwota".toUpperCase()}
              </Text>
              <Text
                style={{
                  ...styles.textCost,
                  ...{
                    color: Colors[scheme].primarySecond,
                    fontFamily: "Kanit_400Regular",
                  },
                }}
              >
                {cost} PLN
              </Text>
            </View>
          </View>

          <View style={styles.middle}>
            <Text
              style={{
                ...styles.textRecipient,
                ...{
                  color: Colors[scheme].primarySecond,
                  fontFamily: "Kanit_600SemiBold",
                },
              }}
            >
              {recipient.toUpperCase()}
            </Text>
            <Text
              style={{
                ...styles.textRecipient,
                ...{
                  color: Colors[scheme].primaryThird,
                  fontFamily: "Kanit_400Regular",
                  fontSize: 14,
                },
              }}
            >
              {description.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...{ marginRight: 20, color: Colors[scheme].primarySecond },
              }}
            >
              archiwizuj opłacony rachunek{" "}
            </Text>
            <Text>{showIsPaid()}</Text>
          </View>
        </View>
      </View>
    </ExternalComponent>
  );
};

export default FixedExpenseDetails;

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "space-around",
    height: 100,
    marginBottom: 10,
    borderBottomRightRadius: Dimensions.get("window").width / 5,
    borderBottomLeftRadius: Dimensions.get("window").width / 5,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    paddingBottom: 5,
    elevation: 7,
  },
  details: {
    marginTop: 25,
    width: Dimensions.get("window").width * 0.9,
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 7,
  },
  history: {
    marginTop: 10,
    height: 200,
    width: Dimensions.get("window").width * 0.9,
    shadowColor: "black",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 7,
  },
  trash: {
    alignItems: "center",
  },
  textTitle: {
    textAlign: "center",
    color: Colors.light.primary,
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
