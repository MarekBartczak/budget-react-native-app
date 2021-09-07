import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import * as itemActions from "../../store/actions/items";

const EditCategoryElement = (props) => {
  const userId = useSelector((state) => state.auth.userID);
  const categoryId = useSelector((state) => state.item.categoryID);
  const dispatch = useDispatch();
  const scheme = useSelector((state) => state.config.scheme);
  const [editCategory, setEditCategory] = useState(props.element);
  const [editState, setEditState] = useState(false);
  const updateSubCategory = () => {
    dispatch(
      itemActions.editCategory(
        props.mainCategory,
        props.element,
        editCategory,
        userId,
        categoryId
      )
    );
  };
  const deleteSubcategory = () => {
    dispatch(
      itemActions.deleteSubcategory(
        props.mainCategory,
        props.element,
        userId,
        categoryId
      )
    );
  };

  return (
    <View
      style={{
        ...styles.element,
        ...{ backgroundColor: Colors[scheme].primaryThird },
      }}
    >
      {editState ? (
        <View style={styles.textElement}>
          <TextInput
            value={editCategory}
            onChangeText={setEditCategory}
            style={{
              backgroundColor: Colors[scheme].primary,
              width: Dimensions.get("window").width * 0.5,
              color: Colors[scheme].primarySecond,
              padding: 5,
              shadowOffset: { height: 0, width: 0 },
              shadowRadius: 7,
              shadowColor: "black",
              shadowOpacity: 0.3,
            }}
          />
        </View>
      ) : (
        <View style={styles.textElement}>
          <Text style={{ color: Colors[scheme].primarySecond }}>
            {props.element}
          </Text>
        </View>
      )}

      {editState ? (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            updateSubCategory();

            setEditState(false);
          }}
        >
          <MaterialIcons name="save" size={24} color={Colors[scheme].button} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            setEditState(true);
          }}
        >
          <MaterialIcons
            name="edit"
            size={24}
            color={Colors[scheme].primarySecond}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          deleteSubcategory();
        }}
      >
        <MaterialIcons
          name="delete"
          size={24}
          color={Colors[scheme].primarySecond}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EditCategoryElement;

const styles = StyleSheet.create({
  element: {
    width: Dimensions.get("window").width * 0.9,
    borderTopLeftRadius: 10,
    marginTop: 10,
    padding: 10,
    height: 50,
    flexDirection: "row",
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
    alignItems: "center",
  },
  textElement: {
    width: Dimensions.get("window").width * 0.65,
  },
});
