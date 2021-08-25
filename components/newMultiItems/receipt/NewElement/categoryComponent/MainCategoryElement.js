import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../../../constants/Colors";
import * as itemActions from "../../../../../store/actions/items";

const MainCategoryElement = (props) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.item.category.main);
  const getColor = () => {
    if (props.title === selectedCategory) {
      return Colors.selected;
    } else {
      return Colors.placeholder;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress;
        dispatch(itemActions.selectMainCategory(props.title));
      }}
    >
      <View
        style={{
          ...styles.mainCategoryElement,
          ...{ backgroundColor: getColor() },
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.icon}>{props.icon}</View>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MainCategoryElement;

const styles = StyleSheet.create({
  mainCategoryElement: {
    margin: 2,
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.15,
    backgroundColor: Colors.placeholder,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    // marginTop: 9,
    color: Colors.default,
    fontSize: 10,
    maxWidth: 100,
  },
});
