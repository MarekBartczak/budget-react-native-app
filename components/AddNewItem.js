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
      style={styles.add}
      onPress={() => {
        props.navigateTo();
        props.setPlace();
      }}
    >
      <View
        style={{
          ...styles.screen,
          ...{ backgroundColor: Colors[scheme].button },
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
                  backgroundColor: Colors[scheme].button,
                  color: Colors[scheme].primary,
                },
              }}
            >
              {props.text}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width * 0.5,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
    marginBottom: 4,
  },
  btnText: {
    fontWeight: "bold",
  },
});

export default AddNewItem;
