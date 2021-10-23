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
    width: Dimensions.get("screen").width * 0.5,
    height: Dimensions.get("screen").height * 0.05,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  addBtn: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
  },
  add: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 15,
    fontFamily: "Kanit_600SemiBold",
  },
});

export default AddNewItem;
