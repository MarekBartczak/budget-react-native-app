import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SimplyItems from "../../components/simplyItems";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import FilterList from "../../components/items/FilterList";

const PlaceScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const itemsFromRedux = useSelector((state) => state.item.items);
  const currentPlaceParam = props.route.params;
  const [currentPlace, setCurrentPlace] = useState(currentPlaceParam.place);

  const placeList = itemsFromRedux.map((el) => {
    return el.place;
  });

  const newList = (placeList) =>
    placeList.filter((a, b) => placeList.indexOf(a) === b);
  const workingPlaceList = newList(placeList);
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

  const callBack = (data) => {
    setCurrentPlace(data);
  };
  return (
    <ExternalComponent>
      <View style={styles.screen}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => switchPlace(-1)}>
            <Ionicons
              name="ios-arrow-back"
              size={43}
              color={Colors[scheme].primarySecond}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...styles.showPlace,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {currentPlace}
          </Text>
          <FilterList listData={workingPlaceList} callBack={callBack} />

          <TouchableOpacity onPress={() => switchPlace(1)}>
            <Ionicons
              name="ios-arrow-forward"
              size={43}
              color={Colors[scheme].primarySecond}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ color: Colors[scheme].primarySecond }}>
            Razem {sum.toFixed(2)}zł
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
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    alignItems: "center",
  },
  showPlace: {
    // color: Colors.primary,
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

export default PlaceScreen;
