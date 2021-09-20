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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as incomeAction from "../../../store/actions/income";

const IncomeElement = (props) => {
  const navigation = useNavigation();

  const scheme = useSelector((state) => state.config.scheme);
  const userId = useSelector((state) => state.auth.userID);

  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(incomeAction.delItem(props.el.id, userId));
    navigation.navigate("Income");
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
      overshootLeft={false}
      // onSwipeableLeftOpen={props.press}
    >
      <View
        style={{
          ...styles.element,
          ...{
            borderColor: Colors[scheme].backGroundOne,
            backgroundColor: Colors[scheme].backGroundOne,
            // shadowColor: Colors[scheme].button,
          },
        }}
        onPress={props.press}
      >
        <View style={styles.title}>
          <Text
            style={{
              ...styles.textTitle,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {props.el.title.toUpperCase()}
          </Text>
        </View>
        <View style={styles.description}>
          <Text
            style={{
              ...styles.textDate,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {props.el.date}
          </Text>
          <Text
            style={{
              ...styles.textCost,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {props.el.cost}zł
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default IncomeElement;

const styles = StyleSheet.create({
  element: {
    marginVertical: 10,

    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0.9,
    // shadowRadius: 10,
    width: Dimensions.get("window").width,
    paddingVertical: 20,
  },
  textTitle: {
    fontFamily: "Kanit_600SemiBold",
  },
  textCost: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  description: {
    alignItems: "center",
  },
});
