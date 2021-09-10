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
import SimplyItems from "../../components/simplyItems";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import FilterList from "../../components/items/FilterList";

const CategoryScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const itemsFromRedux = useSelector((state) => state.item.items);
  const currentCategoryParam = props.route.params;
  const [currentCategory, setCurrentCategory] = useState(
    currentCategoryParam.category
  );

  const categoryList = itemsFromRedux.map((el) => el.subCategory);

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

  const callBack = (data) => {
    setCurrentCategory(data);
  };
  return (
    <ExternalComponent>
      <View style={styles.screen}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => switchCategory(-1)}>
            <Ionicons
              name="ios-arrow-back"
              size={43}
              color={Colors[scheme].primarySecond}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...styles.showCategory,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {currentCategory}
          </Text>
          <FilterList listData={workingCategoryList} callBack={callBack} />

          <TouchableOpacity onPress={() => switchCategory(1)}>
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
                cost={itemData.item.cost}
                subCategory={itemData.item.subCategory}
                press={() =>
                  props.navigation.navigate("Details", {
                    date: itemData.item.date,
                    place: itemData.item.place,
                    mainCategory: itemData.item.mainCategory,
                    subCategory: itemData.item.subCategory,
                    cost: itemData.item.cost,
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

export default CategoryScreen;

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  showCategory: {
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
