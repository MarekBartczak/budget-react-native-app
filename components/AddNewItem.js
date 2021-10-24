import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import fontScale from "../constants/FontScale";

const AddNewItem = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <TouchableOpacity
      style={{
        ...styles.add,
        ...{
          backgroundColor: Colors[scheme].primary,
          shadowColor: "black",
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 7,
        },
      }}
      onPress={() => {
        props.navigateTo();
        props.setPlace();
      }}
    >
      <View
        style={{
          ...styles.screen,
          ...{
            backgroundColor: Colors[scheme].primary,
          },
        }}
      >
        <View
          style={{
            ...styles.addBtn,
          }}
        >
          <View>
            <Text
              style={{
                ...styles.btnText,
                ...{
                  color: Colors[scheme].button,
                },
              }}
            >
              {props.text.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    // width: Dimensions.get("screen").width * 0.5,
    paddingHorizontal: 20,
    height: Dimensions.get("screen").height * 0.04,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  addBtn: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  add: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: fontScale(7),
    fontFamily: "Kanit_600SemiBold",
  },
});

export default AddNewItem;
