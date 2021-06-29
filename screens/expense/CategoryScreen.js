import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SimplyItems from "../../components/SimplyItems";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const CategoryScreen = (props) => {
  const itemsFromRedux = useSelector((state) => state.item.items);
  const currentCategoryParam = props.route.params;
  const [currentCategory, setCurrentCategory] = useState(
    currentCategoryParam.category
  );

  const categoryList = itemsFromRedux.map((el) => {
    return el.category;
  });

  const newList = (categoryList) =>
    categoryList.filter((a, b) => categoryList.indexOf(a) === b);
  const workingCategoryList = newList(categoryList);
  const filteredItem = itemsFromRedux.filter(
    (el) => el.category === currentCategory
  );

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
      <LinearGradient
        colors={[
          Colors.gradientBackground.primary,
          Colors.gradientBackground.secondary,
        ]}
        style={styles.background}
      />
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
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});
