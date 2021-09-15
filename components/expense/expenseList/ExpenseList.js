import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import ExpenseListElement from "./ExpenseListElement";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ExpenseList = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const filter = useSelector((state) => state.item.filter.selectedFilter);
  const items = useSelector((state) => state.item.items);

  const summary = (list) => {
    const countSum = (total, sum) => total + sum;
    const costList = list.map((el) => el.cost);
    return costList.reduce(countSum);
  };
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
