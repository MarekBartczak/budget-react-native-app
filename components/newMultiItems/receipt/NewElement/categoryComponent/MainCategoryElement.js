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
import { useNavigation } from "@react-navigation/native";

const MainCategoryElement = (props) => {
  const navigation = useNavigation();

  const scheme = useSelector((state) => state.config.scheme);

  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.item.category.main);
  const getColor = () => {
    if (props.title === selectedCategory) {
      return Colors[scheme].button;
    } else {
      return Colors[scheme].primaryThird;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress;
        dispatch(itemActions.selectMainCategory(props.title));
      }}
      onLongPress={() => {
        navigation.navigate("EditCategories", {
          title: props.title,
        });
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
          <Text
            style={{
              ...styles.title,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {props.title}
          </Text>
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
    justifyContent: "center",
    alignItems: "center",

    borderTopRightRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  title: {
    textAlign: "center",
    fontSize: 10,
    maxWidth: 100,
  },
});
