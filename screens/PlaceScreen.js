import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
// import Items from "../data/Dummy-data";
import { Ionicons } from "@expo/vector-icons";
import SimplyItems from "../components/SimplyItems";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

const PlaceScreen = (props) => {
  const itemsFromRedux = useSelector((state) => state.item.items);
  // const [newItems, setNewItems] = useState(Items);

  // useEffect(() => {
  //   setNewItems([...Items, ...itemsFromRedux]);
  // }, [itemsFromRedux]);

  const currentPlaceParam = props.route.params;

  const placeList = itemsFromRedux.map((el) => {
    return el.place;
  });
  const newList = (placeList) =>
    placeList.filter((a, b) => placeList.indexOf(a) === b);
  const workingPlaceList = newList(placeList);
  const [currentPlace, setCurrentPlace] = useState(currentPlaceParam.place);
  const filteredItem = itemsFromRedux.filter((el) => el.place === currentPlace);

  const switchPlace = (param) => {
    const currentIndex = workingPlaceList.indexOf(currentPlace);

    if (
      currentIndex + param < [workingPlaceList.length] &&
      currentIndex + param >= 0
    ) {
      setCurrentPlace(workingPlaceList[currentIndex + param]);
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
        <TouchableOpacity onPress={() => switchPlace(-1)}>
          <Ionicons name="ios-arrow-back" size={43} color="black" />
        </TouchableOpacity>
        <Text style={styles.showPlace}>{currentPlace}</Text>
        <TouchableOpacity onPress={() => switchPlace(1)}>
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

export default PlaceScreen;

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    width: "100%",
    alignItems: "center",
  },
  showPlace: {
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
