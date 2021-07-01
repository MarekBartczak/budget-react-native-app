import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SimplyItems from "../../components/SimplyItems";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const DateScreen = (props) => {
  const selectedDate = props.route.params;
  const itemsFromRedux = useSelector((state) => state.item.items);
  const dateList = itemsFromRedux.map((el) => {
    return el.date;
  });
  const newlist = (dateList) =>
    dateList.filter((a, b) => dateList.indexOf(a) === b);
  const workingDateList = newlist(dateList);
  const [currentDate, setCurrentDate] = useState(
    workingDateList[workingDateList.length - 1]
  );

  useEffect(() => {
    if (props.route.params !== undefined) {
      setCurrentDate(selectedDate.selectedDate);
    }
  }, [selectedDate]);
  const filteredItem = itemsFromRedux.filter((el) => el.date === currentDate);

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
      <LinearGradient
        colors={[
          Colors.gradientBackground.primary,
          Colors.gradientBackground.secondary,
        ]}
        style={styles.background}
      />
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
    width: "100%",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
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