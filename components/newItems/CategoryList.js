import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import Category from "../../data/Category";
import CategoryElementList from "./CategoryElementList";
import Colors from "../../constants/Colors";

const categoryList = (props) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [subCat, setSubCat] = useState(selectedCategory);
  const mainCategoryList = [];
  let subCategoryList = [];
  const objKeys = Object.keys(Category);
  for (let i = 0; i < objKeys.length; i++) {
    mainCategoryList.push(Category[objKeys[i]].name);
  }

  const selectedCat = (data) => {
    setSelectedCategory(data);
    getSubCategory();
    setSubCat(selectedCategory);
  };

  const getSubCategory = () => {
    for (let i = 0; i < objKeys.length; i++) {
      if (Category[objKeys[i]].name === selectedCategory) {
        // subCategoryList.push(Object.values(Category[objKeys[i]]));
        // console.log(Object.values(Category[objKeys[i]]));
        subCategoryList = Object.values(Category[objKeys[i]]);
      }
    }
    console.log(subCategoryList);
  };

  return (
    <View style={styles.categoryList}>
      <View style={styles.semiScreen}>
        <Text style={styles.categoryListTitle}>Kategoria</Text>
        <FlatList
          data={mainCategoryList}
          keyExtractor={(item, index) => "item" + index}
          renderItem={(item) => (
            <CategoryElementList
              style={styles.catElement}
              list={item.item}
              press={selectedCat}
            />
          )}
        />
      </View>

      <View style={styles.semiScreen}>
        <Text style={styles.categoryListTitle}>Podkategoria</Text>
        <FlatList
          data={subCat}
          keyExtractor={(item, index) => "item" + index}
          renderItem={(item) => <Text>{item.item}</Text>}
        />
      </View>
    </View>
  );
};

export default categoryList;

const styles = StyleSheet.create({
  categoryList: {
    height: 150,
    width: "100%",
    flexDirection: "row",
    // marginLeft: 10,
    // borderRadius: 10,
    // backgroundColor: Colors.backGround,
  },
  semiScreen: {
    flexDirection: "column",
    width: "50%",
  },
  catElement: {
    color: Colors.accent,
    // backgroundColor: Colors.backGround,
    fontSize: 16,
  },
  categoryListTitle: {
    textAlign: "center",
  },
});
