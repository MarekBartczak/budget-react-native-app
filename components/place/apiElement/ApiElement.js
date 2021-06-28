import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import { useDispatch } from "react-redux";
import * as favoritePlaceAction from "../../../store/actions/favoritePlace";

const ApiElement = (props) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.element}
      onPress={() => {
        dispatch(favoritePlaceAction.editPlace(props.name, props.logo));
        props.closeWindow();
      }}
    >
      <Text style={styles.name}>{props.name}</Text>
      <Image style={styles.logo} source={{ url: props.logo }} />
    </TouchableOpacity>
  );
};

export default ApiElement;

const styles = StyleSheet.create({
  element: {
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: Colors.transparent,
    shadowOffset: { height: 10, width: 10 },
    shadowColor: Colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
  },
  name: {
    fontWeight: "bold",
    color: Colors.primary,
    fontSize: 12,
  },
  logo: {
    height: Dimensions.get("window").width / 10,
    width: Dimensions.get("window").width / 10,
    borderRadius: 3,
  },
});
