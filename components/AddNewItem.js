import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const AddNewItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.add}
      onPress={() => {
        props.navigateTo();
        props.setPlace();
      }}
    >
      <View style={styles.screen}>
        <View style={styles.addBtn}>
          <View>
            <Text style={styles.btnText}>{props.text}</Text>
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
    backgroundColor: Colors.defaultThemeLight.buttton,
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
    // fontSize: 12,
    // marginBottom: -10,
    fontWeight: "bold",
    // paddingHorizontal: 10,
    backgroundColor: Colors.defaultThemeLight.buttton,
    color: Colors.defaultThemeLight.primary,
  },
});

export default AddNewItem;
