import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import EditCategoryElement from "../../components/categories/EditCategoryElement";
import * as itemActions from "../../store/actions/items";
const EdidCategoriesScreen = (props) => {
  const navigation = useNavigation();
  const userId = useSelector((state) => state.auth.userID);
  const categoryId = useSelector((state) => state.item.categoryID);
  const dispatch = useDispatch();
  const { title } = props.route.params;

  const [newSubCategory, setNewSubCategory] = useState("");
  const scheme = useSelector((state) => state.config.scheme);
  const category = useSelector((state) => state.item.categoryList)[0];

  const categoriesListObjectKeys = Object.keys(category);
  const categoryKey = categoriesListObjectKeys.filter(
    (el) => category[el].name === title
  );
  const subCategoriesList = category[categoryKey];
  const addNew = () => {
    dispatch(
      itemActions.addNewSubCategory(
        categoryKey[0],
        newSubCategory,
        userId,
        categoryId
      )
    );
    navigation.goBack();
  };
  return (
    <ExternalComponent>
      <View style={styles.inputView}>
        <TextInput
          style={{
            ...styles.input,
            ...{
              borderColor: Colors[scheme].button,
              color: Colors[scheme].primarySecond,
            },
          }}
          value={newSubCategory}
          placeholder={"wpisz nową kategorię"}
          onChangeText={setNewSubCategory}
        />
        <TouchableOpacity onPress={() => addNew()} style={{ marginLeft: 20 }}>
          <Entypo name="add-to-list" size={34} color={Colors[scheme].button} />
        </TouchableOpacity>
      </View>

      <View style={{ height: Dimensions.get("window").height * 0.5 }}>
        <FlatList
          style={{ paddingBottom: 100, marginBottom: 50, height: 400 }}
          data={subCategoriesList.list}
          keyExtractor={(itemData) => itemData}
          renderItem={(item) => (
            <EditCategoryElement
              element={item.item}
              mainCategory={categoryKey[0]}
            />
          )}
        />
      </View>
    </ExternalComponent>
  );
};

export default EdidCategoriesScreen;

const styles = StyleSheet.create({
  inputView: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: 10,
    height: 40,
    width: Dimensions.get("window").width * 0.6,
    borderWidth: 1,
    borderTopLeftRadius: 10,
  },
});
