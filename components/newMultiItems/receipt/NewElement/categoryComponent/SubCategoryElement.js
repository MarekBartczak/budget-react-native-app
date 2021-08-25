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
import { FontAwesome5 } from "@expo/vector-icons";

const SubCategoryElement = (props) => {
  const dispatch = useDispatch();
  const selectedSubCategory = useSelector((state) => state.item.category.sub);
  return (
    <TouchableOpacity
      onPress={() => dispatch(itemActions.selectSubCategory(props.item))}
    >
      <View>
        <View
          style={
            styles[
              selectedSubCategory === props.item
                ? "subCategoryElementSelected"
                : "subCategoryElement"
            ]
          }
        >
          <FontAwesome5
            name="dot-circle"
            size={24}
            color={selectedSubCategory === props.item ? Colors.accent : "black"}
          />
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
    flexDirection: "row",
  },
  subCategoryElementSelected: {
    margin: 2,
    padding: 5,
    flexDirection: "row",

    backgroundColor: Colors.selected,
    borderTopLeftRadius: 10,
  },
});
