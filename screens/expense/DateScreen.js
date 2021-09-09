import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SimplyItems from "../../components/simplyItems";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import FilterList from "../../components/items/FilterList";
const DateScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
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
  const filteredCostWithMultiple = filteredItem.map((el) => {
    return el.cost * el.multiply;
  });
  const sumOf = (total, sum) => total + sum;

  let sum = 0;
  let multiplySum = 0;

  if (filteredCost.length > 0 && filteredCostWithMultiple.length > 0) {
    sum = filteredCost.reduce(sumOf);
    multiplySum = filteredCostWithMultiple.reduce(sumOf);
  }

  const callBack = (data) => {
    setCurrentDate(data);
  };

  return (
    <ExternalComponent>
      <View style={styles.screen}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => switchDate(-1)}>
            <Ionicons
              name="ios-arrow-back"
              size={43}
              color={Colors[scheme].primarySecond}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...styles.showDate,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {currentDate}
          </Text>
          <FilterList listData={workingDateList} callBack={callBack} />

          <TouchableOpacity onPress={() => switchDate(1)}>
            <Ionicons
              name="ios-arrow-forward"
              size={43}
              color={Colors[scheme].primarySecond}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ color: Colors[scheme].primarySecond }}>
            Razem {sum.toFixed(2)}zł [{multiplySum.toFixed(2)}zł]
          </Text>
        </View>
        <View style={styles.items}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 150 }}
            data={filteredItem}
            renderItem={(itemData) => (
              <SimplyItems
                name={itemData.item.name}
                cost={itemData.item.cost}
                multiply={itemData.item.multiply}
                press={() =>
                  props.navigation.navigate("Details", {
                    date: itemData.item.date,
                    place: itemData.item.place,
                    category: itemData.item.category,
                    cost: itemData.item.cost,
                    name: itemData.item.name,
                    id: itemData.item.id,
                    multiply: itemData.item.multiply,
                  })
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ExternalComponent>
  );
};

export default DateScreen;

const styles = StyleSheet.create({
  screen: {
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  items: {
    width: "100%",
  },
});
