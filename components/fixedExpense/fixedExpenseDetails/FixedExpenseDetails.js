import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
  Clipboard,
} from "react-native";
import History from "./history/History";
import React from "react";
import ExternalComponent from "../../ExternalComponentWithGradient/ExternalComponentWithGradient";
import Colors from "../../../constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import setNextPayDay from "../../../functions/SetNextPayDay";
import { useDispatch, useSelector } from "react-redux";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";

const FixedExpenseDetails = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const { id, cost, title, date, recipient, isPaid } = props.route.params;
  const dispatch = useDispatch();
  const history = useSelector((state) => state.fixedExpense.history);
  const userId = useSelector((state) => state.auth.userID);

  const historyEl = history.filter((el) => el.originId === id);
  const copyToClipboard = () => {
    Clipboard.setString(title);
  };

  const showIsPaid = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: Colors[scheme].button,
          borderRadius: 10,
          padding: 5,
          paddingLeft: 20,
          paddingRight: 20,
          // shadowOffset: { height: 0, width: 0 },
          // shadowColor: "black",
          // shadowOpacity: 0.2,
          // shadowRadius: 7,
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
          color={Colors[scheme].primary}
        />
      </TouchableOpacity>
    );
  };

  history.map((el) => setNextPayDay(el.date, el.interval));
  const setPaid = () => {
    dispatch(fixedExpenseActions.isPaid(!isPaid, id));
    dispatch(fixedExpenseActions.archive(id, userId));

    props.navigation.goBack();
  };

  const removeIncome = () => {
    dispatch(fixedExpenseActions.delItem(id, userId));
    props.navigation.navigate("FixedExpense");
  };

  return (
    <ExternalComponent>
      <View>
        <View
          style={{
            ...styles.title,
            ...{ backgroundColor: Colors[scheme].button },
          }}
        >
          <View style={styles.trash}></View>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text
              style={{
                ...styles.textTitle,
                ...{ color: Colors[scheme].primary },
              }}
            >
              {title}
            </Text>
          </TouchableOpacity>
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
                color={Colors[scheme].primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            ...styles.details,
            ...{ backgroundColor: Colors[scheme].primaryThird },
          }}
        >
          <View style={styles.top}>
            <View style={styles.paymentDate}>
              <Text
                style={{
                  ...{ color: Colors[scheme].primarySecond },
                }}
              >
                Termin zapłaty
              </Text>
              <Text
                style={{
                  ...styles.textDate,
                  ...{ color: Colors[scheme].primarySecond },
                }}
              >
                {date}
              </Text>
            </View>
            <View style={styles.costInfo}>
              <Text
                style={{
                  ...{ color: Colors[scheme].primarySecond },
                }}
              >
                Kwota
              </Text>
              <Text
                style={{
                  ...styles.textCost,
                  ...{ color: Colors[scheme].primarySecond },
                }}
              >
                {cost}zł
              </Text>
            </View>
          </View>

          <View style={styles.middle}>
            <Text
              style={{
                ...styles.textRecipient,
                ...{ color: Colors[scheme].primarySecond },
              }}
            >
              {recipient}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
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
        <View
          style={{
            ...styles.history,
            ...{ backgroundColor: Colors[scheme].primaryThird },
          }}
        >
          <FlatList
            data={historyEl}
            renderItem={(item) => (
              <History
                title={item.item.title}
                cost={item.item.cost}
                date={item.item.date}
                // {item.item.title} {item.item.cost}zł{" "}
                // {item.item.date.replaceAll("-", ".")}
              />
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 40,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
  },
  details: {
    backgroundColor: Colors.light.primaryThird,
    borderRadius: 10,
    height: 200,
    marginBottom: 20,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
  },
  history: {
    backgroundColor: Colors.light.primaryThird,
    borderRadius: 10,
    height: 200,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
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
