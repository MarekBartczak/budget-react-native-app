import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const ItemListToAdd = (props) => {
  const selected = {
    color: props.place === props.list ? Colors.accent : Colors.banner,
  };
  return (
    <View>
      <TouchableOpacity onPress={() => props.setPlace(props.list)}>
        {/* <View> */}
        <Text
          testID="text"
          style={{ ...styles.list, ...{ color: selected.color } }}
        >
          {props.list}
        </Text>
        {/* <Image
            style={{ width: 10, height: 10 }}
            source={{ url: props.logo }}
          /> */}
        {/* </View> */}
      </TouchableOpacity>
    </View>
  );
};

export default ItemListToAdd;

const styles = StyleSheet.create({
  list: {
    color: Colors.banner,
    backgroundColor: Colors.primary,
    marginVertical: 3,
    borderRadius: 10,
    overflow: "hidden",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
