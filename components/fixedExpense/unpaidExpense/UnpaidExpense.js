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
import fontScale from "../../../constants/FontScale";

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

  const unpaidList = dateList.filter((el) => el.isPaid === false);
  const list = unpaidList.map((el) => el.cost);
  useEffect(() => {
    if (list.length > 0) {
      dispatch(fixedExpenseActions.delayCost(list.reduce(summaryCost)));
    } else {
      dispatch(fixedExpenseActions.delayCost(0));
    }
  });

  // console.log(unpaidList);
  return (
    <View
      style={{
        ...styles.unpaidExpenseComponent,
        ...{ backgroundColor: Colors[scheme].light },
      }}
    >
      <FlatList
        data={unpaidList}
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
                  fontSize: fontScale(6),
                }}
              >
                {item.item.date.replace(/-/g, ".")}{" "}
              </Text>
              <Text
                style={{
                  color: Colors[scheme].primarySecond,
                  fontFamily: "Kanit_400Regular",
                  fontSize: fontScale(6),
                }}
              >
                {item.item.title.toUpperCase()}{" "}
              </Text>
            </View>

            <Text
              style={{
                color: Colors[scheme].primarySecond,
                fontFamily: "Kanit_400Regular",
                fontSize: fontScale(6),
              }}
            >
              {item.item.cost} PLN{" "}
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
    width: Dimensions.get("window").width * 0.9,
    maxHeight: 200,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 2,
    shadowColor: "black",
    shadowOpacity: 0.2,
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 7,
  },
  overDateList: {
    marginTop: 5,
    marginLeft: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
