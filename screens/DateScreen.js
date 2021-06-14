import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Items from "../data/Dummy-data";
import { Ionicons } from "@expo/vector-icons";
import SimplyItems from "../components/SimplyItems";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

const DateScreen = (props) => {
  const itemsFromRedux = useSelector((state) => state.item.items);
  const [newItems, setNewItems] = useState(Items);

  useEffect(() => {
    setNewItems([...Items, ...itemsFromRedux]);
  }, [itemsFromRedux]);

  const dateList = newItems.map((el) => {
    return el.date;
  });
  const newlist = (dateList) =>
    dateList.filter((a, b) => dateList.indexOf(a) === b);
  const workingDateList = newlist(dateList);

  const selectedDate = props.route.params;
  const [currentDate, setCurrentDate] = useState(
    workingDateList[workingDateList.length - 1]
  );

  useEffect(() => {
    if (props.route.params !== undefined) {
      setCurrentDate(selectedDate.selectedDate);
    }
  }, [selectedDate]);

  const filteredItem = newItems.filter((el) => el.date === currentDate);

  const switchDate = (param) => {
    const currentIndex = workingDateList.indexOf(currentDate);

    if (
      currentIndex + param < [workingDateList.length] &&
      currentIndex + param >= 0
    ) {
      setCurrentDate(workingDateList[currentIndex + param]);
    }
  };

  const filteredCost = filteredItem.map((el) => {
    return el.cost;
  });
  const sumOf = (total, sum) => total + sum;
  const sum = filteredCost.reduce(sumOf);

  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => switchDate(-1)}>
          <Ionicons name="ios-arrow-back" size={43} color="black" />
        </TouchableOpacity>
        <Text style={styles.showDate}>{currentDate}</Text>
        <TouchableOpacity onPress={() => switchDate(1)}>
          <Ionicons name="ios-arrow-forward" size={43} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Razem {sum.toFixed(2)}zł</Text>
      </View>
      <View style={styles.items}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 150 }}
          data={filteredItem}
          renderItem={(itemData) => (
            <SimplyItems
              name={itemData.item.name}
              cost={itemData.item.cost}
              press={() =>
                props.navigation.navigate("Details", {
                  date: itemData.item.date,
                  place: itemData.item.place,
                  category: itemData.item.category,
                  cost: itemData.item.cost,
                  name: itemData.item.name,
                  id: itemData.item.id,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default DateScreen;

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    width: "100%",
    alignItems: "center",
  },
  showDate: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  top: {
    marginTop: 10,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  items: {
    width: "100%",
  },
});
