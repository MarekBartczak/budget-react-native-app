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
      <View style={styles.inner}>
        <View style={styles.addBtn}>
          <View>
            <TouchableOpacity
              style={styles.add}
              onPress={props.pressToAddSignleItem}
            >
              <Ionicons
                name="ios-add-circle-outline"
                size={62}
                color={Colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>Pojedynczy Wydatek</Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.add}
              onPress={() => {
                props.pressToAddMultiItems();
                dispatch(favoritePlaceAction.selectPlace(""));
              }}
            >
              <Ionicons
                name="ios-cart-outline"
                size={62}
                color={Colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>Cały Paragon</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width * 0.9,
    height: 100,
    backgroundColor: Colors.gradientBackground.third,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  inner: {
    backgroundColor: Colors.gradientBackground.third,
    borderRadius: 10,
    height: "88%",
    width: "96%",
    borderWidth: 3,
    borderColor: Colors.primary,
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
    marginBottom: 5,
  },
  btnText: {
    marginBottom: -10,
    fontWeight: "bold",
    fontSize: 9,
    paddingHorizontal: 10,
    backgroundColor: Colors.gradientBackground.third,
  },
});

export default AddNewItem;
