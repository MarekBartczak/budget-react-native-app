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
      return Colors.light.button;
    } else {
      return Colors.light.primaryThird;
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
    marginBottom: 4,
    left: -5,
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.15,
    backgroundColor: Colors.placeholder,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 10,
    // borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  title: {
    textAlign: "center",
    // marginTop: 9,
    color: Colors.light.primarySecond,
    fontSize: 10,
    maxWidth: 100,
  },
});
