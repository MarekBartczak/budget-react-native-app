import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as itemActions from "../../../../../store/actions/items";
const SubCategoryElement = (props) => {
  const dispatch = useDispatch();
  const selectedSubCategory = useSelector((state) => state.item.category.sub);
  return (
    <TouchableOpacity
      onPress={() => dispatch(itemActions.selectSubCategory(props.item))}
    >
      <View
        style={
          styles[
            selectedSubCategory === props.item
              ? "subCategoryElementSelected"
              : "subCategoryElement"
          ]
        }
      >
        <Text
          style={
            styles[
              selectedSubCategory === props.item
                ? "subCategoryTextSelected"
                : "subCategoryText"
            ]
          }
        >
          {props.item}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubCategoryElement;

const styles = StyleSheet.create({
  subCategoryText: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
  },
  subCategoryTextSelected: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,

    color: Colors.accent,
  },
  subCategoryElement: {
    margin: 2,
    padding: 5,
    backgroundColor: Colors.accent,
    borderTopLeftRadius: 10,
  },
  subCategoryElementSelected: {
    margin: 2,
    padding: 5,

    backgroundColor: Colors.selected,
    borderTopLeftRadius: 10,
  },
});
