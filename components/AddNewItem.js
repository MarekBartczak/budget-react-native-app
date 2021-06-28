import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as favoritePlaceAction from "../store/actions/favoritePlace";
import { useDispatch } from "react-redux";

const AddNewItem = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.addBtn}>
        <TouchableOpacity
          style={styles.add}
          onPress={props.pressToAddSignleItem}
        >
          <Ionicons
            name="ios-add-circle-outline"
            size={62}
            color={Colors.primary}
          />
          <Text>Pojedynczy Wydatek</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            props.pressToAddMultiItems();
            dispatch(favoritePlaceAction.selectPlace(""));
          }}
        >
          <Ionicons name="ios-cart-outline" size={62} color={Colors.primary} />
          <Text>Cały Paragon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width * 0.9,
    height: 100,
    backgroundColor: Colors.transparent,
    shadowOffset: { height: 0, width: 10 },
    shadowColor: Colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  addBtn: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
  },
  add: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddNewItem;
