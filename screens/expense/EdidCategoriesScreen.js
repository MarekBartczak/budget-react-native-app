import { StyleSheet, Text, View, FlatList } from "react-native";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import React from "react";
import Colors from ".././../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
const EdidCategoriesScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const { title } = props.route.params;
  const category = useSelector((state) => state.item.categoryList)[0];
  const categoriesListObjectKeys = Object.keys(category);

  const subCategoriesList =
    category[
      categoriesListObjectKeys.filter((el) => category[el].name === title)
    ];
  console.log(subCategoriesList.list);
  return (
    <ExternalComponent>
      <View>
        <Text style={{ color: "red" }}>{title}</Text>
      </View>
      <View>
        <FlatList
          data={subCategoriesList.list}
          keyExtractor={(itemData) => itemData}
          renderItem={(item) => (
            <View>
              <Text style={{ color: Colors[scheme].primarySecond }}>
                {item.item}
              </Text>
            </View>
          )}
        />
      </View>
    </ExternalComponent>
  );
};

export default EdidCategoriesScreen;

const styles = StyleSheet.create({});
