import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import * as expenseActions from "../../../store/actions/items";
import getElementToFilterBy from "../../../functions/expenseFilter/getElementToFilterBy";
const ExpenseFilter = (props) => {
  const items = useSelector((state) => state.item.items);
  const dispatch = useDispatch();

  const scheme = useSelector((state) => state.config.scheme);
  const filterType = useSelector((state) => state.item.filter.filterType);
  const getFilterBy = useSelector((state) => state.item.filter.selectedFilter);

  const setFilterBy = (type, filter) => {
    dispatch(expenseActions[`setFilter_${type}`](filter));
  };

  const filteredBy = {
    date: getElementToFilterBy(items, "date"),
    mainCategory: getElementToFilterBy(items, "mainCategory"),
    place: getElementToFilterBy(items, "place"),
  };
  return (
    <View>
      <Text
        style={{
          color: Colors[scheme].primarySecond,
          fontSize: 10,
          fontFamily: "Kanit_400Regular",
          marginVertical: 10,

          textAlign: "center",
        }}
      >
        Filtr: data: {getFilterBy.date}, kategoria:
        {getFilterBy.mainCategory}, miejsce: {getFilterBy.place}{" "}
      </Text>
      <Text
        style={{
          color: Colors[scheme].button,
          fontSize: 10,
          fontFamily: "Kanit_600SemiBold",
          marginVertical: 5,

          textAlign: "center",
        }}
      >
        ZNALEZIONO: 0
      </Text>
      <FlatList
        style={{
          width: Dimensions.get("window").width,
          marginBottom: Dimensions.get("window").height * 0.35,
        }}
        data={filteredBy[filterType]}
        keyExtractor={(item) => item}
        renderItem={(item) => (
          <TouchableOpacity
            onPress={() => setFilterBy(filterType, item.item)}
            style={{
              borderColor: Colors[scheme].primary,
              borderBottomWidth: 1,
              padding: 20,
            }}
          >
            <Text
              style={{
                color: Colors[scheme].button,
              }}
            >
              {item.item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ExpenseFilter;

const styles = StyleSheet.create({});
