import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../../../../constants/Colors";
const MainCategoryElement = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.mainCategoryElement}>
        <View style={styles.icon}>{props.icon}</View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MainCategoryElement;

const styles = StyleSheet.create({
  mainCategoryElement: {
    margin: 5,
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    backgroundColor: Colors.placeholder,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    marginTop: 9,
    color: Colors.default,
    fontSize: 15,
  },
});
