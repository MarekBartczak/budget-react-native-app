import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Items from "../data/dummy-data";
import { Ionicons } from "@expo/vector-icons";
import SimplyItems from "../components/simplyItems";
import Colors from "../constants/Colors";

const DateScreen = (props) => {
  const dateList = Items.map((el) => {
    return el.date;
  });
  const newlist = (dateList) =>
    dateList.filter((a, b) => dateList.indexOf(a) === b);
  const workingDateList = newlist(dateList);

  const [currentDate, setCurrentDate] = useState(
    workingDateList[workingDateList.length - 1]
  );

  const filteredItem = Items.filter((el) => el.date === currentDate);

  const switchDate = (param) => {
    const currentIndex = workingDateList.indexOf(currentDate);

    if (
      currentIndex + param < [workingDateList.length] &&
      currentIndex + param >= 0
    ) {
      setCurrentDate(workingDateList[currentIndex + param]);
    }
  };

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
    fontSize: 26,
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
