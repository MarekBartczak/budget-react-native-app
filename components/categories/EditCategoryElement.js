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
import fontScale from "../../constants/FontScale";

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
        ...{ backgroundColor: Colors[scheme].primary },
      }}
    >
      {editState ? (
        <View style={styles.textElement}>
          <TextInput
            value={editCategory}
            onChangeText={setEditCategory}
            style={{
              borderColor: Colors[scheme].button,
              borderBottomWidth: 1,
              // width: Dimensions.get("window").width * 0.5,
              color: Colors[scheme].primarySecond,
              padding: 5,
            }}
          />
        </View>
      ) : (
        <View style={styles.textElement}>
          <Text
            style={{
              color: Colors[scheme].primarySecond,
              fontFamily: "Kanit_600SemiBold",
              fontSize: fontScale(6),
            }}
          >
            {props.element.toUpperCase()}
          </Text>
        </View>
      )}

      {editState ? (
        <TouchableOpacity
          style={{
            marginRight: 20,
          }}
          onPress={() => {
            updateSubCategory();

            setEditState(false);
          }}
        >
          <MaterialIcons name="save" size={24} color={Colors[scheme].button} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            marginRight: 20,
            marginLeft: 10,
          }}
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
        style={{}}
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  textElement: {
    // width: Dimensions.get("window").width * 0.65,
  },
});
