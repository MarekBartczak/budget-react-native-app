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
  const scheme = useSelector((state) => state.config.scheme);

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
        <View
          style={{
            ...styles.title,
            ...{ backgroundColor: Colors[scheme].button },
          }}
        >
          <View style={styles.trash}></View>

          <Text
            style={{
              ...styles.textTitle,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {title}
          </Text>
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
                color={Colors[scheme].primarySecond}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            ...styles.details,
            ...{ ...{ backgroundColor: Colors[scheme].primaryThird } },
          }}
        >
          <View style={styles.top}>
            <View style={styles.date}>
              <Text style={{ color: Colors[scheme].primarySecond }}>Data</Text>
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
              <Text style={{ color: Colors[scheme].primarySecond }}>Kwota</Text>
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
  trash: {
    alignItems: "center",
    width: 30,
  },
  textTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  details: {
    borderRadius: 10,
    height: 200,
    marginBottom: 20,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
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
    fontWeight: "bold",
    fontSize: 20,
  },
});
