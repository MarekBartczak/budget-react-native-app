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
import { useDispatch, useSelector } from "react-redux";
import * as favoritePlaceAction from "../../../store/actions/favoritePlace";

const ApiElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const userId = useSelector((state) => state.auth.userID);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={{
        ...styles.element,
        ...{ backgroundColor: Colors[scheme].primaryThird },
      }}
      onPress={() => {
        dispatch(favoritePlaceAction.editPlace(props.name, props.logo, userId));
        props.closeWindow();
      }}
    >
      <Text
        style={{ ...styles.name, ...{ color: Colors[scheme].primarySecond } }}
      >
        {props.name}
      </Text>
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
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
  },
  name: {
    fontWeight: "bold",
    fontSize: 12,
  },
  logo: {
    height: Dimensions.get("window").width / 10,
    width: Dimensions.get("window").width / 10,
    borderRadius: Dimensions.get("window").width / 10,
  },
});
