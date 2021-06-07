import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
const AddNewItem = (props) => {
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
          <Text>Pojedynczy Element</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.add} onPress={() => {}}>
          <Ionicons name="ios-cart-outline" size={62} color={Colors.primary} />
          <Text>Cały Paragon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(213, 213, 213,1)",
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
