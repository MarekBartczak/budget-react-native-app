import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
const ExpenseListElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  return (
    <View
      style={{
        ...styles.element,
        ...{ borderColor: Colors[scheme].separator },
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
        <Text
          style={{
            fontFamily: "Kanit_400Regular",
            color: Colors[scheme].primaryThird,
            marginRight: 10,
          }}
        >
          {props.mainCategory.toUpperCase()}
        </Text>
      </View>
    </View>
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
