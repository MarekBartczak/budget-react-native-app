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
import { dataLang, selectLang } from "../../../lang/lang";
const ExpenseFilter = (props) => {
  const items = useSelector((state) => state.item.items);
  const dispatch = useDispatch();

  const scheme = useSelector((state) => state.config.scheme);
  const filterType = useSelector((state) => state.item.filter.filterType);
  const filterCount = useSelector((state) => state.item.filter.count);
  const getFilterBy = useSelector((state) => state.item.filter.selectedFilter);
  const search = useSelector((state) => state.item.filter.searchElement);
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
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
        {translate("Filtr")}: {translate("data")}: {getFilterBy.date},{" "}
        {translate("kategoria")}:{getFilterBy.mainCategory},{" "}
        {translate("miejsce")}: {getFilterBy.place}{" "}
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
        {translate("ZNALEZIONO")}: {filterCount.items}
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
