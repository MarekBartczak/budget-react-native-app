import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import ExpenseListElement from "./ExpenseListElement";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getFilteredListBySelectedFilter from "../../../functions/expenseFilter/getFilteredListBySelectedFilter";
import getFilteredListBySearchInput from "../../../functions/expenseFilter/getFilteredListBySearchInput";
const ExpenseList = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const filter = useSelector((state) => state.item.filter);
  const bareItems = useSelector((state) => state.item.items);
  const [filteredList, setFilterList] = useState(
    getFilteredListBySelectedFilter(filter, bareItems)
  );

  useEffect(() => {
    setFilterList(getFilteredListBySelectedFilter(filter, bareItems));
  }, [filter]);

  let filteredByInput = getFilteredListBySearchInput(
    filter.searchElement,
    filteredList
  );

  let items = filteredByInput;

  const summary = (list) => {
    if (list.length > 0) {
      const countSum = (total, sum) => total + sum;
      const costList = list.map((el) => el.cost);

      return costList.reduce(countSum);
    } else {
      return 0;
    }
  };
  props.getListLength(items.length);
  props.getCost(summary(items));
  return (
    <View style={{ ...styles.expenseList, ...{ flex: 1 } }}>
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          style={{ marginBottom: Dimensions.get("window").height * 0.2 }}
          renderItem={(item) => (
            <ExpenseListElement
              cost={item.item.cost}
              date={item.item.date}
              mainCategory={item.item.mainCategory}
              place={item.item.place}
              subCategory={item.item.subCategory}
              id={item.item.id}
            />
          )}
        />
      ) : (
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height * 0.6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="spider-web"
            size={250}
            color={Colors[scheme].button}
          />
          <MaterialCommunityIcons
            name="spider-thread"
            size={54}
            color={Colors[scheme].button}
          />
          <Text style={{ color: Colors[scheme].button, marginTop: 30 }}>
            NIC NIE ZNALEZIONO
          </Text>
        </View>
      )}
    </View>
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  expenseList: {},
});
