import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Button,
} from "react-native";

import React, { useState } from "react";
import Colors from "../constants/Colors";
import * as favoritePlaceAction from "../store/actions/favoritePlace";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/newItems/Input";
import FavPlaceElement from "../components/FavPlaceElement";
import {
  Autocomplete,
  withKeyboardAwareScrollView,
} from "react-native-dropdown-autocomplete";
import ApiList from "../components/place/ApiList";

const FavoritePlaces = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [favPlaceName, setFavPlaceName] = useState("");
  const favplaceLogo = useSelector((state) => state.favoritePlace.selectedLogo);
  const favPlaceList = useSelector(
    (state) => state.favoritePlace.favoritePlace
  );
  const selectedFavPlace = useSelector((state) => state.favoritePlace.selected);
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
  // const data = [
  //   "Apples",
  //   "Broccoli",
  //   "Chicken",
  //   "Duck",
  //   "Eggs",
  //   "Fish",
  //   "Granola",
  //   "Hash Browns",
  // ];
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
          <TouchableOpacity onPress={() => setShowEdit(false)}>
            <View>
              <View style={styles.apiList}>
                <ApiList
                  source={favPlaceName}
                  closeWindow={() => setShowEdit(false)}
                />
              </View>
              {/* <Image
                style={styles.ModalViewImage}
                source={{ url: favplaceLogo }}
              /> */}
              <Input
                style={styles.input}
                value={favPlaceName}
                placeholder={"nazwa"}
                keyboardType="default"
                onChangeText={setFavPlaceName}
              />
              {/* <View style={{ height: 40, width: 200 }}>
                <Autocomplete data={data} valueExtractor={(item) => item} />
              </View> */}
            </View>
            <View style={styles.closeModalBtn}>
              <Text style={styles.closeModalText}>Zamknij</Text>
            </View>
          </TouchableOpacity>
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
    width: "100%",
    height: 200,
    backgroundColor: Colors.banner,
    shadowOffset: { height: 0, width: 10 },
    shadowColor: Colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    marginTop: 20,
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
  logo: {
    height: "80%",
    width: "80%",
    borderRadius: 10,
    borderColor: "rgba(189,81,291,0.6)",
    borderWidth: 3,
  },
  modalEdit: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.banner,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    fontSize: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
    fontWeight: "bold",
    margin: 5,
    margin: 10,
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
    width: Dimensions.get("window").width * 0.8,
    alignItems: "center",
  },
});

export default FavoritePlaces;
