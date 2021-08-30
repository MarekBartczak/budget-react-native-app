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
            color={
              selectedSubCategory === props.item
                ? Colors.light.primaryThird
                : Colors.light.primarySecond
            }
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
    color: Colors.light.primarySecond,
  },
  subCategoryTextSelected: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,

    color: Colors.light.primaryThird,
  },
  subCategoryElement: {
    margin: 5,
    padding: 5,
    backgroundColor: Colors.light.primaryThird,
    borderTopLeftRadius: 10,
    flexDirection: "row",
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  subCategoryElementSelected: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: Colors.light.button,

    borderTopLeftRadius: 10,
  },
});
