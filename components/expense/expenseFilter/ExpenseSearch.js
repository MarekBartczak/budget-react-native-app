import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import SearchEngine from "../expenseFilter/SearchEngine";
const ExpenseSearch = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          ...styles.screen,
          ...{},
        }}
      >
        <TouchableOpacity
          onPress={() => props.modalHandlerSearch(false)}
          style={{
            ...styles.dimmer,
            ...{ backgroundColor: Colors[scheme].dimmer },
          }}
        ></TouchableOpacity>
        <View
          style={{
            ...styles.expenseHeaderModalSearch,
            ...{
              borderTopLeftRadius: 100,
              borderTopRightRadius: 100,
              backgroundColor: Colors[scheme].backGround,
            },
          }}
        >
          <View
            style={{
              ...styles.close,
              ...{
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                backgroundColor: Colors[scheme].backGroundOne,
                // borderColor: Colors[scheme].primary,
                // borderWidth: 1,
              },
            }}
          >
            <TouchableOpacity
              style={{ ...styles.closeBtn, ...{} }}
              onPress={() => props.modalHandlerSearch(false)}
            >
              <Text
                style={{
                  ...styles.closeBtnText,
                  ...{
                    color: Colors[scheme].button,
                    backgroundColor: Colors[scheme].light,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 10,
                    overflow: "hidden",
                  },
                }}
              >
                ZAMKNIJ
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.searchArea, ...{} }}>
            <SearchEngine />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ExpenseSearch;

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
  expenseHeaderModalSearch: {
    height: Dimensions.get("window").height * 0.6,
  },
  closeBtn: {
    alignItems: "center",
  },
  closeBtnText: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 15,
  },
  searchArea: {},
});
