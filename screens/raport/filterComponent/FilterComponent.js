import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import months from "../../../constants/Months";

const FilterComponent = (props) => {
  const flatListRef = useRef();

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState();
  const [list, setList] = useState([]);
  const listObj = {
    expense: useSelector((state) => state.item.items),
    fixedExpense: useSelector((state) => state.fixedExpense.fixedExpense),
    income: useSelector((state) => state.income.income),
    fixedIncome: useSelector((state) => state.fixedIncome.fixedIncome),
  };

  const testEl = listObj.expense[6].date;
  const range = listObj.expense.length;

  const monthInxed = months.findIndex((el) => el === month) + 1;
  const selectedDate = `${year}-${
    monthInxed < 10 ? "0" + monthInxed : monthInxed
  }`;

  console.log(testEl);
  console.log(selectedDate);

  console.log(testEl.includes(selectedDate));
  let lst = [];
  listObj.expense.forEach((el) => {
    if (el.date.includes(selectedDate)) {
      console.log(el);
      lst.push(el);
    }
  });
  console.log(lst);
  //   const checkMonth = (itemDate) => {
  //     return months[new Date(itemDate).getMonth()];
  //   };
  //   const selectedMonth = checkMonth(testEl);

  const listOfYears = () => {
    const list = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];
    return list;
  };

  return (
    <View>
      <View style={styles.filterComponent}>
        <View style={styles.yearsListFilter}>
          <Text> Wybierz rok </Text>
          <FlatList
            ref={flatListRef}
            style={styles.listOfYears}
            data={listOfYears()}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setYear(item.item);
                  }}
                >
                  <Text style={styles.date}>{item.item}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(key) => key}
          />
        </View>
        <View style={styles.monthsListFilter}>
          <Text> Wybierz miesiąc </Text>

          <FlatList
            ref={flatListRef}
            style={styles.listOfYears}
            data={months}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setMonth(item.item);
                  }}
                >
                  <Text style={styles.date}>{item.item}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(key) => key}
          />
        </View>
      </View>

      <Text>
        {year} {month}
      </Text>
      <View>
        <FlatList
          data={lst}
          keyExtractor={(key, index) => key + index}
          renderItem={(item) => (
            <View style={{ backgroundColor: "white", marginBottom: 20 }}>
              <Text>{item.item.name}</Text>
              <Text>{item.item.date}</Text>
              <Text>{item.item.place}</Text>
              <Text>{item.item.cost}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
  filterComponent: {
    flexDirection: "row",
    backgroundColor: Colors.accent,
    height: 200,
  },
  listOfYears: {
    backgroundColor: Colors.backGround,
  },
  yearsListFilter: {
    height: 100,
    width: 100,
  },
  monthsListFilter: {
    height: 100,
    width: 200,
  },
  date: {
    fontSize: 20,
  },
});
