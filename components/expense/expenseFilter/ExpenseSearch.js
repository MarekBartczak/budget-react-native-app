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
import fontScale from "../../../constants/FontScale";
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
              onPress={() => props.modalHandlerSearch(false)}
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
    alignItems: "center",
  },
  expenseHeaderModalSearch: {
    height: Dimensions.get("window").height * 0.6,
  },
  closeBtn: {
    // marginTop: 5,
    alignItems: "center",
  },
  closeBtnText: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: fontScale(8),
  },
  searchArea: {},
});
