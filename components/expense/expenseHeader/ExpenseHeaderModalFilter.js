import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";

const ExpenseHeaderModalFilter = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <View
      style={{
        ...styles.screen,
        ...{},
      }}
    >
      <TouchableOpacity
        onPress={() => props.modalHandler(false)}
        style={{
          ...styles.dimmer,
          ...{ backgroundColor: Colors[scheme].dimmer },
        }}
      ></TouchableOpacity>
      {/* <View */}
      <View
        style={{
          ...styles.expenseHeaderModalFilter,
          ...{
            backgroundColor: Colors[scheme].backGround,
          },
        }}
      >
        <View
          style={{
            ...styles.close,
            ...{ backgroundColor: Colors[scheme].primary },
          }}
        >
          <TouchableOpacity
            style={{ ...styles.closeBtn, ...{} }}
            onPress={() => props.modalHandler(false)}
          >
            <Text
              style={{
                ...styles.closeBtnText,
                ...{ color: Colors[scheme].button },
              }}
            >
              ZAMKNIJ
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.filterArea, ...{} }}></View>
      </View>
    </View>
  );
};

export default ExpenseHeaderModalFilter;

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  expenseHeaderModalFilter: {
    // marginTop: Dimensions.get("window").height * 0.4,
    height: Dimensions.get("window").height * 0.6,
  },
  dimmer: {
    height: Dimensions.get("window").height * 0.4,
  },
  close: {
    height: Dimensions.get("window").height * 0.05,
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  filterArea: {},
  closeBtn: {
    alignItems: "center",
  },
  closeBtnText: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 15,
  },
});