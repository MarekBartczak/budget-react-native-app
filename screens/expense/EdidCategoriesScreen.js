import { StyleSheet, Text, View } from "react-native";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
const EdidCategoriesScreen = (props) => {
  const category = useSelector((state) => state.item.categoryList)[0];
  const categoriesListObjectKeys = Object.keys(category);
  // const subCategoriesList =
  const mainCategoryList = categoriesListObjectKeys.map(
    (el) => category[el].name
  );
  console.log(category);
  const { title } = props.route.params;
  console.log(title);
  return (
    <ExternalComponent>
      <View>
        <Text style={{ color: "red" }}>{title}</Text>
      </View>
    </ExternalComponent>
  );
};

export default EdidCategoriesScreen;

const styles = StyleSheet.create({});
