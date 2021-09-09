import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import SubCategoryElement from "./SubCategoryElement";

const SubCategoryList = (props) => {
  const Category = useSelector((state) => state.item.categoryList)[0];
  const selectedMainCategory = useSelector((state) => state.item.category.main);
  const categoryList = Object.keys(Category);

  const selectedObjectTitle = categoryList.filter(
    (el) => Category[el].name === selectedMainCategory
  );
  let subCategoryList = [];
  if (selectedObjectTitle.length > 0) {
    const subCategoryobj = Category[selectedObjectTitle];
    subCategoryList = subCategoryobj.list;
  }
  return (
    <View style={styles.list}>
      <FlatList
        data={subCategoryList}
        keyExtractor={(item, index) => item + index}
        renderItem={(item) => <SubCategoryElement item={item.item} />}
      />
    </View>
  );
};
{
}

export default SubCategoryList;

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    width: Dimensions.get("window").width * 0.9,
    maxHeight: Dimensions.get("window").height * 0.9,
    paddingBottom: 140,
  },
});
