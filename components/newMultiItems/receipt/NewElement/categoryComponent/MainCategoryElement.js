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

import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
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

  const iconsObj = {
    automobile: (
      <FontAwesome name="automobile" size={props.iconSize} color={getColor()} />
    ),
    "food-variant": (
      <MaterialCommunityIcons
        name="food-variant"
        size={props.iconSize}
        color={getColor()}
      />
    ),
    "pump-soap": (
      <FontAwesome5 name="pump-soap" size={props.iconSize} color={getColor()} />
    ),
    "home-repair-service": (
      <MaterialIcons
        name="home-repair-service"
        size={props.iconSize}
        color={getColor()}
      />
    ),
    home: <Entypo name="home" size={props.iconSize} color={getColor()} />,
    computer: (
      <MaterialIcons name="computer" size={props.iconSize} color={getColor()} />
    ),
    redhat: (
      <FontAwesome5 name="redhat" size={props.iconSize} color={getColor()} />
    ),
    "pen-tool": (
      <Feather name="pen-tool" size={props.iconSize} color={getColor()} />
    ),
    "family-restroom": (
      <MaterialIcons
        name="family-restroom"
        size={props.iconSize}
        color={getColor()}
      />
    ),
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
          ...{ backgroundColor: Colors[scheme].primary },
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.icon}>{iconsObj[props.icon]}</View>
          <Text
            style={{
              ...styles.title,
              ...{ color: getColor() },
            }}
          >
            {props.title.toUpperCase()}
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
    shadowRadius: 2,
  },
  title: {
    fontFamily: "Kanit_400Regular",
    textAlign: "center",
    fontSize: 10,
    maxWidth: 100,
  },
});
