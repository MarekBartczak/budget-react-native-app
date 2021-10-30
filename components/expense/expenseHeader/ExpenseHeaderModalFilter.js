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

import SelectFilterType from "./modalFilter/SelectFilterType";
import ExpenseFilter from "../expenseFilter/ExpenseFilter";
import fontScale from "../../../constants/FontScale";
import { dataLang, selectLang } from "../../../lang/lang";
const ExpenseHeaderModalFilter = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
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
      <View
        style={{
          ...styles.expenseHeaderModalFilter,
          ...{
            borderTopLeftRadius: Dimensions.get("window").width / 5,
            borderTopRightRadius: Dimensions.get("window").width / 5,
            backgroundColor: Colors[scheme].backGround,
          },
        }}
      >
        <View
          style={{
            ...styles.close,
            ...{
              borderTopLeftRadius: Dimensions.get("window").width / 5,
              borderTopRightRadius: Dimensions.get("window").width / 5,
              backgroundColor: Colors[scheme].backGroundOne,
            },
          }}
        >
          <TouchableOpacity
            style={{ ...styles.closeBtn, ...{} }}
            onPress={() => props.modalHandler(false)}
          >
            <Text
              style={{
                ...styles.closeBtnText,
                ...{
                  color: Colors[scheme].button,
                  backgroundColor: Colors[scheme].light,
                  paddingHorizontal: 10,
                  paddingVertical: 0,
                  borderRadius: 10,
                  overflow: "hidden",
                },
              }}
            >
              {translate("ZAMKNIJ").toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.filterArea,
            ...{ backgroundColor: Colors[scheme].light, height: "100%" },
          }}
        >
          <SelectFilterType />
          <ExpenseFilter />
        </View>
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
    fontSize: fontScale(8),
  },
});
