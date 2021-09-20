import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../constants/Colors";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation } from "@react-navigation/native";
import * as itemsAction from "../../../store/actions/items";

const ExpenseListElement = (props) => {
  const userId = useSelector((state) => state.auth.userID);
  const scheme = useSelector((state) => state.config.scheme);
  const categories = useSelector((state) => state.item.categoryList);
  const navigation = useNavigation();
  const getColor = () => Colors[scheme].accent;
  const iconSize = 20;
  const dispatch = useDispatch();
  const iconList = [
    {
      icon: () => (
        <FontAwesome name="automobile" size={iconSize} color={getColor()} />
      ),
      name: "motoryzacja",
    },
    {
      icon: () => (
        <MaterialCommunityIcons
          name="food-variant"
          size={iconSize}
          color={getColor()}
        />
      ),
      name: "spożywcze",
    },
    {
      icon: () => (
        <FontAwesome5 name="pump-soap" size={iconSize} color={getColor()} />
      ),
      name: "chemia domowa",
    },
    {
      icon: () => (
        <MaterialIcons
          name="home-repair-service"
          size={iconSize}
          color={getColor()}
        />
      ),
      name: "usługi",
    },
    {
      icon: () => <Entypo name="home" size={iconSize} color={getColor()} />,
      name: "dom",
    },
    {
      icon: () => (
        <MaterialIcons name="computer" size={iconSize} color={getColor()} />
      ),
      name: "elektronika",
    },
    {
      icon: () => (
        <FontAwesome5 name="redhat" size={iconSize} color={getColor()} />
      ),
      name: "odzież",
    },
    {
      icon: () => (
        <Feather name="pen-tool" size={iconSize} color={getColor()} />
      ),
      name: "art biurowe",
    },
    {
      icon: () => (
        <MaterialIcons
          name="family-restroom"
          size={iconSize}
          color={getColor()}
        />
      ),
      name: "rodzinne",
    },
  ];

  const showIcon = () => {
    const categoryEl = iconList.filter((el) => el.name === props.mainCategory);
    return categoryEl[0].icon();
  };
  const deleteItem = () => {
    dispatch(itemsAction.delItem(props.id, userId));
    navigation.navigate("Home");
    // console.log(props);
  };

  const rightSwipeActions = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Uwaga!",
            "Czy usunąć?",
            [
              { text: "Nie", style: "cancel" },
              { text: "Tak", onPress: () => deleteItem() },
            ],
            { cancelable: false }
          );
        }}
        style={{
          backgroundColor: Colors[scheme].delete,
          justifyContent: "center",
          alignItems: "flex-end",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          <Ionicons
            name="ios-trash"
            size={44}
            color={Colors[scheme].primarySecond}
          />
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      // onSwipeableRightOpen={() => deleteItem()}
    >
      <View
        style={{
          ...styles.element,
          ...{
            borderColor: Colors[scheme].backGroundOne,
            backgroundColor: Colors[scheme].backGroundOne,
          },
        }}
      >
        <View style={{ ...styles.container, ...{} }}>
          <Text
            style={{
              fontFamily: "Kanit_400Regular",
              color: Colors[scheme].primaryThird,
              fontSize: 15,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            {props.date}
          </Text>
        </View>

        <View
          style={{
            ...styles.container,
            ...{
              justifyContent: "space-between",
              alignItems: "center",
              width: Dimensions.get("window").width,
              paddingVertical: 5,
            },
          }}
        >
          <Text
            style={{
              fontFamily: "Kanit_600SemiBold",
              color: Colors[scheme].primarySecond,
              marginLeft: 10,
              fontSize: 17,
            }}
          >
            {props.subCategory.toUpperCase()}
          </Text>
          <Text
            style={{
              fontFamily: "Kanit_600SemiBold",
              color: Colors[scheme].primarySecond,
              fontSize: 17,
              marginRight: 10,
            }}
          >
            {props.cost}zł
          </Text>
        </View>
        <View
          style={{
            ...styles.container,
            ...{
              justifyContent: "space-between",
              alignItems: "center",
              width: Dimensions.get("window").width,
              paddingBottom: 10,
            },
          }}
        >
          <Text
            style={{
              fontFamily: "Kanit_400Regular",
              color: Colors[scheme].primaryThird,
              marginLeft: 10,
              fontSize: 15,
            }}
          >
            {props.place}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Kanit_400Regular",
                color: Colors[scheme].primaryThird,
                marginRight: 5,
              }}
            >
              {props.mainCategory.toUpperCase()}
            </Text>
            <Text style={{ marginRight: 10 }}>{showIcon()} </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default ExpenseListElement;

const styles = StyleSheet.create({
  element: {
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
  },
});
