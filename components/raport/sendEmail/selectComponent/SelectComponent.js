import { StyleSheet, Text, View, Dimensions } from "react-native";
import Colors from "../../../../constants/Colors";
import SelectEl from "./SelectEl";
import React from "react";
import { useSelector } from "react-redux";
import * as raportActions from "../../../../store/actions/raport";
import Send from "../email/send";

const SelectComponent = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const initialRaportState = useSelector((state) => state.raport);

  return (
    <View>
      <View
        style={{
          ...styles.select,
          ...{
            backgroundColor: Colors[scheme].backGroundOne,
            shadowColor: Colors[scheme].drawerActive,
            shadowOffset: { height: 1, width: 0 },
            shadowOpacity: 1,
            shadowRadius: 5,
            paddingBottom: 5,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
            elevation: 7,
          },
        }}
      >
        <SelectEl
          el={"Expense"}
          dateList={initialRaportState.Expense}
          name={"Wydatki"}
        />
        <SelectEl
          el={"FixedExpense"}
          dateList={initialRaportState.FixedExpense}
          name={"Stałe wydatki"}
        />
        <SelectEl
          el={"Income"}
          dateList={initialRaportState.Income}
          name={"Wpływy"}
        />
      </View>
      <View
        style={{
          ...styles.send,
          ...{},
        }}
      >
        <Send />
      </View>
    </View>
  );
};

export default SelectComponent;

const styles = StyleSheet.create({
  select: {
    flexDirection: "row",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
  },
  titleText: {
    textAlign: "center",
    fontSize: 15,
  },
  send: {
    position: "absolute",
    top: 200,
    height: Dimensions.get("window").height - 400,
    width: Dimensions.get("window").width,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
