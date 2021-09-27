import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as favoritePlaceAction from "../store/actions/favoritePlace";
import * as itemsAction from "../store/actions/items";
import Colors from "../constants/Colors";

const FavPlaceElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const newFavPlace = () => {
    props.selectPlace();
    props.setFavPlaceName();
    props.showEdit();
  };
  const addNewElementToReceipt = () => {
    props.selectPlace();
    dispatch(favoritePlaceAction.selectPlace(props.favPlaceName));
    dispatch(itemsAction.setReceiptPlace(props.favPlaceName));
    props.pressToAddMultiItems();
  };

  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.favPlaceLogo) {
          addNewElementToReceipt();
        } else {
          newFavPlace();
        }
      }}
      onLongPress={() => {
        newFavPlace();
      }}
      delayLongPress="500"
    >
      <View style={styles.favBtn}>
        <Image
          style={{ ...styles.logo, ...{ borderColor: Colors[scheme].primary } }}
          source={{ url: props.favPlaceLogo }}
        />
        <Text
          style={{ ...styles.text, ...{ color: Colors[scheme].primarySecond } }}
        >
          {props.favPlaceName.toUpperCase()}
        </Text>
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
  },
  text: {
    width: "80%",
    height: 20,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Kanit_400Regular",
  },
  logo: {
    height: "80%",
    width: "80%",
    borderRadius: 3,

    borderWidth: 1,
  },
});
