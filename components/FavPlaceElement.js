import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
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

  let path = require("../assets/default_fav_element_dark.png");
  switch (scheme) {
    case "dark":
      path = require("../assets/default_fav_element_dark.png");
      break;
    case "light":
      path = require("../assets/default_fav_element_light.png");
      break;
    case "light_Blue":
      path = require("../assets/default_fav_element_light_Blue.png");
      break;
    case "light_Pink":
      path = require("../assets/default_fav_element_light_Pink.png");
      break;
    case "light_Gold":
      path = require("../assets/default_fav_element_light_Gold.png");
      break;
  }

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
        {props.favPlaceLogo === "" ? (
          <Image
            style={{
              ...styles.logo,
              ...{ borderColor: Colors[scheme].primary },
            }}
            // source={{ url: props.favPlaceLogo }}
            source={path}
          />
        ) : (
          <Image
            style={{
              ...styles.logo,
              ...{ borderColor: Colors[scheme].primary },
            }}
            source={{ uri: props.favPlaceLogo }}
          />
        )}
        <Text
          style={{ ...styles.text, ...{ color: Colors[scheme].primarySecond } }}
        >
          {props.favPlaceName === "dodaj"
            ? ""
            : props.favPlaceName.toUpperCase()}
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
    height: Dimensions.get("window").width / 5.6,
    width: Dimensions.get("window").width / 5.6,
    borderRadius: 10,

    // borderWidth: 1,
  },
});
