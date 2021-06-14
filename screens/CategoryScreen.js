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

const CategoryScreen = (props) => {
  const itemsFromRedux = useSelector((state) => state.item.items);
  const [newItems, setNewItems] = useState(Items);

  useEffect(() => {
    setNewItems([...Items, ...itemsFromRedux]);
  }, [itemsFromRedux]);

  const currentCategoryParam = props.route.params;
  const categoryList = newItems.map((el) => {
    return el.category;
  });

  const newList = (categoryList) =>
    categoryList.filter((a, b) => categoryList.indexOf(a) === b);
  const workingCategoryList = newList(categoryList);
  const [currentCategory, setCurrentCategory] = useState(
    currentCategoryParam.category
  );

  const filteredItem = newItems.filter((el) => el.category === currentCategory);

  const switchCategory = (param) => {
    const currentIndex = workingCategoryList.indexOf(currentCategory);
    if (
      currentIndex + param < [workingCategoryList.length] &&
      currentIndex + param >= 0
    ) {
      setCurrentCategory(workingCategoryList[currentIndex + param]);
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
        <TouchableOpacity onPress={() => switchCategory(-1)}>
          <Ionicons name="ios-arrow-back" size={43} color="black" />
        </TouchableOpacity>
        <Text style={styles.showCategory}>{currentCategory}</Text>
        <TouchableOpacity onPress={() => switchCategory(1)}>
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

export default CategoryScreen;

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  showCategory: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  top: {
    marginTop: 10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  items: {
    width: "100%",
  },
});
