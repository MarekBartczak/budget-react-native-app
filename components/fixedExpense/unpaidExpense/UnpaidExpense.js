import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../constants/Colors";
import * as fixedExpenseActions from "../../../store/actions/fixedExpense";

import React, { useEffect } from "react";
const UnpaidExpense = (props) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const scheme = useSelector((state) => state.config.scheme);
  const fixedExpensesList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );
  const today = new Date();
  const dateList = fixedExpensesList.filter((el) => new Date(el.date) < today);
  const summaryCost = (total, sum) => total + sum;

  const list = dateList.map((el) => el.cost);
  useEffect(() => {
    if (list.length > 0) {
      dispatch(fixedExpenseActions.delayCost(list.reduce(summaryCost)));
    } else {
      dispatch(fixedExpenseActions.delayCost(0));
    }
  });
  return (
    <View
      style={{
        ...styles.unpaidExpenseComponent,
        ...{ borderColor: Colors[scheme].separator },
      }}
    >
      <FlatList
        data={dateList}
        style={{ marginBottom: 10 }}
        renderItem={(item) => (
          <TouchableOpacity
            style={styles.overDateList}
            onPress={() => {
              navigation.navigate("FixedExpenseDetails", {
                id: item.item.id,
                cost: item.item.cost,
                title: item.item.title,
                date: item.item.date,
                recipient: item.item.recipient,
                isPaid: item.item.isPaid,
                description: item.item.description,
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: Colors[scheme].primarySecond,
                  fontFamily: "Kanit_400Regular",
                }}
              >
                {item.item.date.replace(/-/g, ".")}{" "}
              </Text>
              <Text
                style={{
                  color: Colors[scheme].primarySecond,
                  fontFamily: "Kanit_400Regular",
                }}
              >
                {item.item.title.toUpperCase()}{" "}
              </Text>
            </View>

            <Text
              style={{
                color: Colors[scheme].primarySecond,
                fontFamily: "Kanit_400Regular",
              }}
            >
              {item.item.cost}zł{" "}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(dateList) => dateList.id}
      />
    </View>
  );
};

export default UnpaidExpense;

const styles = StyleSheet.create({
  unpaidExpenseComponent: {
    width: Dimensions.get("window").width,
    height: 100,
    borderBottomWidth: 1,
  },
  overDateList: {
    marginTop: 5,
    marginLeft: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
