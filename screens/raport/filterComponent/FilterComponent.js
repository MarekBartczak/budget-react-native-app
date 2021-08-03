import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import months from "../../../constants/Months";
import getDateList from "./GetDateList";

import Expense from "../elemets/Expense";
import FixedExpense from "../elemets/FixedExpense";
import Income from "../elemets/Income";
import FixedIncome from "../elemets/FixedIncome";
import DateElement from "../elemets/DateElement";

const FilterComponent = (props) => {
  const flatListRef = useRef();

  const [year, setYear] = useState(new Date().getFullYear());
  const [filterListType, setFilterListType] = useState("Expense");
  const listObj = {
    Expense: useSelector((state) => state.item.items),
    FixedExpense: useSelector((state) => state.fixedExpense.fixedExpense),
    Income: useSelector((state) => state.income.income),
    FixedIncome: useSelector((state) => state.fixedIncome.fixedIncome),
  };

  const dateList = {
    Expense: getDateList(listObj.Expense),
    FixedExpense: getDateList(listObj.FixedExpense),
    Income: getDateList(listObj.Income),
    FixedIncome: getDateList(listObj.FixedIncome),
  };

  let filteredList = [];
  const showList = (type) => {
    listObj[type].forEach((el) => {
      if (el.date.includes(year)) {
        filteredList.push(el);
      }
    });
    switch (type) {
      case "Expense":
        return <Expense filteredList={filteredList} />;
      case "FixedExpense":
        return <FixedExpense filteredList={filteredList} />;
      case "Income":
        return <Income filteredList={filteredList} />;
      case "FixedIncome":
        return <FixedIncome filteredList={filteredList} />;
    }
  };

  const filterBtn = (type, name) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setFilterListType(type);
          setYear(dateList[type][0]);
        }}
      >
        <Text style={styles.btnText}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.switch}>
        <View style={styles.inner}>
          {filterBtn("Expense", "Wydatki")}
          {filterBtn("FixedExpense", "Stałe wydatki")}
          {filterBtn("Income", "Wpływy")}
          {filterBtn("FixedIncome", "Stałe wpływy")}
        </View>
      </View>

      <View style={styles.filterComponent}>
        <View style={styles.yearsListFilter}>
          <Text> Wybierz date </Text>
          <FlatList
            ref={flatListRef}
            style={styles.listOfYears}
            data={dateList[filterListType]}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setYear(item.item);
                  }}
                >
                  <DateElement element={item.item} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(key) => key}
          />
        </View>
      </View>
      <View style={styles.list}>{showList(filterListType)}</View>
    </View>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
  filterComponent: {
    flexDirection: "row",
    // backgroundColor: Colors.accent,
    height: 150,
  },
  listOfYears: {
    width: Dimensions.get("window").width * 0.9,

    // backgroundColor: Colors.backGround,
  },
  yearsListFilter: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  monthsListFilter: {
    height: 100,
    width: 200,
  },

  switch: {
    backgroundColor: Colors.accent,
    width: "100%",
    height: 60,

    alignItems: "center",
    // padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: Colors.accent,

    borderRadius: 10,
    height: "70%",
    width: "96%",
    borderWidth: 3,
    borderColor: Colors.gradientBackground.primary,
  },
  btnText: {
    // color: Colors.accent,
    fontWeight: "bold",
    fontSize: 12,
    padding: 5,
  },
  list: {
    marginTop: 50,
  },
});
