import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const ItemListToAdd = (props) => {
  const selected = {
    color: props.place === props.list ? Colors.accent : Colors.banner,
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.setPlace(props.list)}
        style={{ alignItems: "center" }}
      >
        <View style={styles.list}>
          <Text testID="text" style={{ ...{ color: selected.color } }}>
            {props.list}
          </Text>
          <View style={styles.imageView}>
            <Image
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
              }}
              source={{ url: props.imageUrl }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemListToAdd;

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.7,
    padding: 5,
    color: Colors.banner,
    backgroundColor: Colors.primary,
    marginVertical: 3,
    borderRadius: 10,
    paddingLeft: 20,
  },
  imageView: {
    marginLeft: 20,
  },
});
