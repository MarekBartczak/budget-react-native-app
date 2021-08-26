import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import * as favoritePlaceAction from "../store/actions/favoritePlace";
import * as itemsAction from "../store/actions/items";
import Colors from "../constants/Colors";

const FavPlaceElement = (props) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        props.selectPlace();
        dispatch(favoritePlaceAction.selectPlace(props.favPlaceName));
        dispatch(itemsAction.setReceiptPlace(props.favPlaceName));
        props.pressToAddMultiItems();
      }}
      onLongPress={() => {
        props.selectPlace();
        props.setFavPlaceName();
        props.showEdit();
      }}
      delayLongPress="500"
    >
      <View style={styles.favBtn}>
        <Image style={styles.logo} source={{ url: props.favPlaceLogo }} />
        <Text style={styles.text}> {props.favPlaceName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FavPlaceElement;

const styles = StyleSheet.create({
  favBtn: {
    margin: 10,
    height: 80,

    width: Dimensions.get("window").width / 4,
    alignItems: "center",
    justifyContent: "flex-end",
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.3,
  },
  text: {
    width: "80%",
    height: 20,
    textAlign: "center",
  },
  logo: {
    height: "80%",
    width: "80%",
    borderRadius: 10,

    borderColor: Colors.defaultThemeLight.accent,
    borderWidth: 1,
  },
});
