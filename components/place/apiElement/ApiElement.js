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
import fontScale from "../../../constants/FontScale";

const ApiElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const userId = useSelector((state) => state.auth.userID);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={{
        ...styles.element,
        ...{
          borderColor: Colors[scheme].primary,
          // backgroundColor: Colors[scheme].primary,
        },
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
      <Image style={styles.logo} source={{ uri: props.logo }} />
    </TouchableOpacity>
  );
};

export default ApiElement;

const styles = StyleSheet.create({
  element: {
    width: Dimensions.get("window").width,
    // height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 5,
    overflow: "hidden",
    borderBottomWidth: 1,
    // borderBottomWidth: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: fontScale(8),
    fontFamily: "Kanit_600SemiBold",
  },
  logo: {
    height: Dimensions.get("window").width / 10,
    width: Dimensions.get("window").width / 10,
    borderRadius: Dimensions.get("window").width / 10,
  },
});
