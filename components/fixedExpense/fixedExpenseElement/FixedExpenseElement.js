import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import * as fixedExpenseActions from "../../../store/actions/fixedExpense";
const checkPayDate = (date) => {
  return new Date() > new Date(date) ? "red" : "green";
};

const FixedExpenseElement = (props) => {
  const navigation = useNavigation();
  const userId = useSelector((state) => state.auth.userID);

  const dispatch = useDispatch();
  const scheme = useSelector((state) => state.config.scheme);
  const deleteItem = () => {
    dispatch(fixedExpenseActions.delItem(props.el.id, userId));
    navigation.navigate("FixedExpense");
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

  const leftSwipeActions = () => {
    return (
      <TouchableOpacity
        onPress={props.press}
        style={{
          backgroundColor: Colors[scheme].details,
          justifyContent: "center",
          alignItems: "flex-end",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            paddingHorizontal: 20,
            color: Colors[scheme].primary,
            fontFamily: "Kanit_600SemiBold",
            fontSize: 18,
          }}
        >
          SZCZEGÓŁY
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      renderLeftActions={leftSwipeActions}
      overshootLeft={false}
      onSwipeableLeftOpen={props.press}
    >
      <View
        style={{
          ...styles.element,
          ...{
            // borderColor: Colors[scheme].backGroundOne,
            backgroundColor: Colors[scheme].light,
          },
        }}
      >
        <View style={styles.title}>
          <Text style={{ color: Colors[scheme].primarySecond }}>
            {props.el.title.toUpperCase()}
          </Text>
        </View>
        <View style={styles.description}>
          <Text
            style={{
              color: checkPayDate(props.el.date),
              fontFamily: "Kanit_600SemiBold",
            }}
          >
            {props.el.date}
          </Text>
          <Text style={{ color: Colors[scheme].primarySecond }}>
            {props.el.cost}zł
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default FixedExpenseElement;

const styles = StyleSheet.create({
  element: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // shadowColor: "black",
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    width: Dimensions.get("window").width,
    // borderBottomWidth: 1,
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
});
