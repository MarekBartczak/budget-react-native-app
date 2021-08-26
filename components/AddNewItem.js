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
    <View style={styles.screen}>
      <View style={styles.inner}>
        <View style={styles.addBtn}>
          <View>
            <TouchableOpacity
              style={styles.add}
              onPress={() => {
                props.navigateTo();
                props.setPlace();
              }}
            >
              {props.icon}
            </TouchableOpacity>
            <Text style={styles.btnText}>{props.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width * 0.9,
    height: 100,
    backgroundColor: Colors.defaultThemeLight.buttton,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  inner: {
    backgroundColor: Colors.defaultThemeLight.buttton,
    borderRadius: 10,
    height: "88%",
    width: "96%",
    borderWidth: 3,
    borderColor: Colors.defaultThemeLight.primary,
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
    marginBottom: 5,
  },
  btnText: {
    marginBottom: -10,
    fontWeight: "bold",
    paddingHorizontal: 10,
    backgroundColor: Colors.defaultThemeLight.buttton,
    color: Colors.defaultThemeLight.primary,
  },
});

export default AddNewItem;
