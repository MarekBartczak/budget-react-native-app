import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import Category from "../../data/Category";
import CategoryElementList from "./CategoryElementList";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const categoryList = (props) => {
  const [subCat, setSubCat] = useState();
  const mainCategoryList = [];
  const objKeys = Object.keys(Category);
  for (let i = 0; i < objKeys.length; i++) {
    mainCategoryList.push(Category[objKeys[i]].name);
  }

  const selectedCat = (data) => {
    for (let i = 0; i < Object.keys(Category).length; i++) {
      if (Category[Object.keys(Category)[i]].name === data) {
        const newList = { ...Category[Object.keys(Category)[i]] };
        delete newList.name;
        setSubCat(Object.values(newList));
      }
    }
  };

  return (
    <View style={styles.categoryList}>
      <View style={styles.semiScreen}>
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
      <LinearGradient
        colors={[Colors.banner, Colors.primary, Colors.banner]}
        style={{
          height: 20,
          width: "100%",
          marginTop: 15,
          marginBottom: 5,
          shadowOffset: { height: 10, width: 0 },
          shadowColor: "black",
          shadowOpacity: 0.9,
          shadowRadius: 10,
        }}
      />

      <View style={styles.semiScreen}>
        <FlatList
          data={subCat}
          keyExtractor={(item, index) => "item" + index}
          renderItem={(item) => (
            <CategoryElementList
              style={styles.catElement}
              list={item.item}
              press={props.onChangeCategory}
            />
          )}
        />
      </View>
    </View>
  );
};

export default categoryList;

const styles = StyleSheet.create({
  categoryList: {
    width: "100%",
    flexDirection: "column",

    justifyContent: "space-around",
    alignItems: "center",
    shadowOffset: { height: 0, width: 10 },
    shadowColor: "black",
    shadowOpacity: 0.23,
    shadowRadius: 10,
  },
  semiScreen: {
    marginTop: 10,
    flexDirection: "column",
    width: "90%",
    height: 70,
  },
  catElement: {
    color: Colors.primary,
    backgroundColor: Colors.banner,
    marginVertical: 3,
    borderRadius: 10,
    overflow: "hidden",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  categoryListTitle: {
    textAlign: "center",
  },
});
