import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";

import React, { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import * as favoritePlaceAction from "../store/actions/favoritePlace";
import { useSelector, useDispatch } from "react-redux";
import Input from "./input/Input";
import FavPlaceElement from "../components/FavPlaceElement";
import ApiList from "../components/place/ApiList";
import { LinearGradient } from "expo-linear-gradient";

const FavoritePlaces = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

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
    <View
      style={{
        ...styles.screen,
        ...{
          width: scheme === "dark" ? Dimensions.get("window").width : null,
          backgroundColor: Colors[scheme].light,
          shadowOffset: { height: 0, width: 0 },
          shadowRadius: 2,
          shadowColor: "black",
          shadowOpacity: 0.2,
          borderRadius: 10,
          elevation: 5,
        },
      }}
    >
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
        <View
          style={{
            ...styles.modalEdit,
            ...{ backgroundColor: Colors[scheme].backGround },
          }}
        >
          <TouchableOpacity onPress={() => setShowEdit(false)}>
            <View
              style={{
                ...styles.closeModalBtn,
                ...{ borderColor: Colors[scheme].primaryThird },
              }}
            >
              <Text
                style={{
                  ...styles.closeModalText,
                  ...{ color: Colors[scheme].button },
                }}
              >
                Zamknij
              </Text>
            </View>
            <View>
              <Input
                style={{
                  ...styles.input,
                  ...{
                    color: Colors[scheme].primarySecond,
                    borderColor: Colors[scheme].primaryThird,
                  },
                }}
                value={favPlaceName === "dodaj" ? "" : favPlaceName}
                placeholder={"nazwa"}
                keyboardType="default"
                onChangeText={setFavPlaceName}
                placeholderTextColor={Colors[scheme].button}
              />
              <View style={styles.apiList}>
                <ApiList
                  source={favPlaceName === "dodaj" ? "" : favPlaceName}
                  closeWindow={() => setShowEdit(false)}
                />
              </View>
            </View>
          </TouchableOpacity>
          {/* </LinearGradient> */}
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
    height: Dimensions.get("window").height * 0.3,
    marginTop: 20,
    paddingTop: 10,
    borderRadius: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  favBtn: {
    margin: 10,
    height: 80,
    width: Dimensions.get("window").width / 4,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  modalEdit: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingTop: 100,
    alignItems: "center",
  },
  input: {
    height: 40,
    fontSize: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    fontWeight: "bold",
    margin: "10%",
  },
  ModalViewImage: {
    height: Dimensions.get("window").width / 2,
    width: Dimensions.get("window").width / 2,
    borderRadius: 20,
  },
  closeModalBtn: {
    width: Dimensions.get("window").width / 2,
    alignItems: "center",
    marginHorizontal: Dimensions.get("window").width / 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,

    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 30,
  },
  closeModalText: {
    fontWeight: "bold",
  },
  apiList: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
});

export default FavoritePlaces;
