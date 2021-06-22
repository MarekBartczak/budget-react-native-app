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

const FavPlaceElement = (props) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        props.selectPlace();
        // dispatch(favoritePlaceAction.selectPlace(favPlaceList[0].name));
        props.pressToAddMultiItems();
        // props.pressToAddMultiItems();
      }}
      onLongPress={() => {
        dispatch(favoritePlaceAction.selecLogo(props.favPlaceLogo));

        props.selectPlace();
        // dispatch(favoritePlaceAction.selectPlace(favPlaceList[0].name));
        props.setFavPlaceName();
        // setFavPlaceName(favPlaceList[0].name);
        props.showEdit();
        // setShowEdit(true);
      }}
      delayLongPress="500"
    >
      <View style={styles.favBtn}>
        <Image style={styles.logo} source={{ url: props.favPlaceLogo }} />
        <Text> {props.favPlaceName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FavPlaceElement;

const styles = StyleSheet.create({
  favBtn: {
    margin: 10,
    // backgroundColor: Colors.primary,
    height: 80,
    width: Dimensions.get("window").width / 4,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    height: "80%",
    width: "80%",
    borderRadius: 10,
    borderColor: "rgba(189,81,291,0.6)",
    borderWidth: 3,
  },
});
