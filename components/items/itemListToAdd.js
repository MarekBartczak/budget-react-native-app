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
    fontWeight: props.place === props.list ? "bold" : null,
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.setPlace(props.list)}
        style={{ alignItems: "center" }}
      >
        <View style={styles.list}>
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
          <Text
            testID="text"
            style={{ ...{ fontWeight: selected.fontWeight } }}
          >
            {props.list}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemListToAdd;

const styles = StyleSheet.create({
  text: {
    color: Colors.backgroundColor,
  },
  list: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.7,
    padding: 5,
    color: Colors.primary,
    backgroundColor: Colors.defaultThemeLight.white,
    marginVertical: 3,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,

    paddingLeft: 20,
  },
  imageView: {
    marginRight: 20,
  },
});
