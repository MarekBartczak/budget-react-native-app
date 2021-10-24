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
import { useSelector } from "react-redux";
import fontScale from "../../constants/FontScale";

const ItemListToAdd = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const selected = {
    fontWeight: props.place === props.list ? "bold" : null,
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.setPlace(props.list)}
        style={{ alignItems: "center" }}
      >
        <View
          style={{
            ...styles.list,
            ...{
              borderColor: Colors[scheme].primary,
            },
          }}
        >
          <View style={styles.imageView}>
            <Image
              style={{
                width: fontScale(6),
                height: fontScale(6),
                borderRadius: 20,
                marginLeft: 30,
              }}
              source={{ uri: props.imageUrl }}
            />
          </View>
          <Text
            testID="text"
            style={{
              ...{
                fontWeight: selected.fontWeight,
                color: Colors[scheme].headerTintColor,
                fontFamily: "Kanit_400Regular",
                fontSize: fontScale(5),
              },
            }}
          >
            {props.list.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemListToAdd;

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    padding: 3,

    // marginVertical: 2,
    // shadowOffset: { height: 0, width: 0 },
    // shadowRadius: 7,
    // shadowColor: "black",
    // shadowOpacity: 0.2,

    paddingLeft: 20,
  },
  imageView: {
    marginRight: 30,
  },
});
