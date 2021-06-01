import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import Items from "../data/dummy-data";
import { Ionicons } from "@expo/vector-icons";
import SimplyItems from "../components/simplyItems";

const DateScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="ios-arrow-back" size={43} color="black" />
        </TouchableOpacity>
        <Text>2021-05-31</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="ios-arrow-forward" size={43} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.items}>
        <FlatList
          data={Items}
          renderItem={(itemData) => (
            <SimplyItems
              //   place={itemData.item.place}
              //   category={itemData.item.category}
              name={itemData.item.name}
              cost={itemData.item.cost}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default DateScreen;

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    width: "100%",
    alignItems: "center",
  },
  top: {
    marginTop: 10,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  items: {
    width: "100%",
  },
});
