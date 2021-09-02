import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import months from "../../../constants/Months";
import getDateList from "./GetDateList";

import ListOfElements from "../elemets/ListOfElements";

import DateElement from "../elemets/DateElement";
import * as raportActions from "../../../store/actions/raport";
const FilterComponent = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const flatListRef = useRef();
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date().getFullYear());
  const [filterListType, setFilterListType] = useState("Expense");
  const listObj = {
    Expense: useSelector((state) => state.item.items),
    FixedExpense: useSelector((state) => state.fixedExpense.fixedExpense),
    Income: useSelector((state) => state.income.income),
  };

  const dateList = {
    Expense: getDateList(listObj.Expense),
    FixedExpense: getDateList(listObj.FixedExpense),
    Income: getDateList(listObj.Income),
  };
  const createInitialRaportState = (dateList) => {
    return {
      Expense: {
        isSelected: false,
        dateList: [
          dateList.Expense.map((el) => {
            return { date: el, isSelected: false };
          }),
        ],
      },
      FixedExpense: {
        isSelected: false,
        dateList: [
          dateList.FixedExpense.map((el) => {
            return { date: el, isSelected: false };
          }),
        ],
      },
      Income: {
        isSelected: false,
        dateList: [
          dateList.Income.map((el) => {
            return { date: el, isSelected: false };
          }),
        ],
      },
    };
  };

  dispatch(
    raportActions.initialRaportState(createInitialRaportState(dateList))
  );

  const showList = (type) => {
    let filteredList = [];
    listObj[type].forEach((el) => {
      if (el.date.includes(year)) {
        filteredList.push(el);
      }
    });

    switch (type) {
      case "Expense":
        return <ListOfElements filteredList={filteredList} />;
      case "FixedExpense":
        return <ListOfElements filteredList={filteredList} />;
      case "Income":
        return <ListOfElements filteredList={filteredList} />;
    }
  };

  const filterBtn = (type, name) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.filterBtn,
          ...{ backgroundColor: Colors[scheme].button },
        }}
        onPress={() => {
          setFilterListType(type);
          setYear(dateList[type][0]);
        }}
      >
        <Text
          style={{
            ...styles.btnText,
            ...{ color: Colors[scheme].primary },
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.switch}>
        {filterBtn("Expense", "Wydatki")}
        {filterBtn("FixedExpense", "Stałe wydatki")}
        {filterBtn("Income", "Wpływy")}
      </View>

      <View style={styles.filterComponent}>
        <View style={styles.yearsListFilter}>
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
  filterBtn: {
    // marginTop: 10,
    marginHorizontal: 20,
    // height: 30,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  switch: {
    flexDirection: "row",
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  btnText: {
    // color: Colors.accent,
    fontWeight: "bold",
    fontSize: 12,
    padding: 5,
  },
  list: {
    marginTop: 10,
    padding: 10,
    height: Dimensions.get("window").height * 0.5,
  },
});
