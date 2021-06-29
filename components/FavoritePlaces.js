import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";

import React, { useState } from "react";
import Colors from "../constants/Colors";
import * as favoritePlaceAction from "../store/actions/favoritePlace";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/newItems/Input";
import FavPlaceElement from "../components/FavPlaceElement";
import ApiList from "../components/place/ApiList";
import { LinearGradient } from "expo-linear-gradient";

const FavoritePlaces = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [favPlaceName, setFavPlaceName] = useState("");
  const favPlaceList = useSelector(
    (state) => state.favoritePlace.favoritePlace
  );
  const dispatch = useDispatch();

  const favPlace = (favPlaceList) => {
    return (
      <FavPlaceElement
        selectPlace={() =>
          dispatch(favoritePlaceAction.selectPlace(favPlaceList.name))
        }
        pressToAddMultiItems={() => props.pressToAddMultiItems()}
        setFavPlaceName={() => setFavPlaceName(favPlaceList.name)}
        showEdit={() => setShowEdit(true)}
        favPlaceLogo={favPlaceList.logo}
        favPlaceName={favPlaceList.name}
      />
    );
  };
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        {favPlace(favPlaceList[0])}
        {favPlace(favPlaceList[1])}
        {favPlace(favPlaceList[2])}
      </View>

      <View style={styles.row}>
        {favPlace(favPlaceList[3])}
        {favPlace(favPlaceList[4])}
        {favPlace(favPlaceList[5])}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showEdit}
        onRequestClose={() => setShowEdit(false)}
      >
        <View style={styles.modalEdit}>
          <LinearGradient
            colors={[
              Colors.gradientBackground.primary,
              Colors.gradientBackground.secondary,
            ]}
            style={styles.background}
          >
            <TouchableOpacity onPress={() => setShowEdit(false)}>
              <View>
                <Input
                  style={styles.input}
                  value={favPlaceName}
                  placeholder={"nazwa"}
                  keyboardType="default"
                  onChangeText={setFavPlaceName}
                />
                <View style={styles.apiList}>
                  <ApiList
                    source={favPlaceName}
                    closeWindow={() => setShowEdit(false)}
                  />
                </View>
              </View>
              <View style={styles.closeModalBtn}>
                <Text style={styles.closeModalText}>Zamknij</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
    height: 200,
    backgroundColor: Colors.transparent,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    marginTop: 20,
    paddingTop: 10,
    borderRadius: 10,
  },

  icon: {
    height: "40%",
    width: "30%",
    backgroundColor: "red",
  },
  row: {
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  favBtn: {
    margin: 10,
    // backgroundColor: Colors.primary,
    height: 80,
    width: Dimensions.get("window").width / 4,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  modalEdit: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    fontSize: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
    fontWeight: "bold",
    margin: "10%",
    color: Colors.primary,
    borderColor: Colors.primary,
  },
  ModalViewImage: {
    height: Dimensions.get("window").width / 2,
    width: Dimensions.get("window").width / 2,
    borderRadius: 20,
  },
  closeModalBtn: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeModalText: {
    color: Colors.primary,
  },
  apiList: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  background: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});

export default FavoritePlaces;
