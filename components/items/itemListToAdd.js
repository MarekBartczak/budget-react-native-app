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
              color: Colors[scheme].primary,
              backgroundColor: Colors[scheme].primaryThird,
            },
          }}
        >
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
            style={{
              ...{
                fontWeight: selected.fontWeight,
                color: Colors[scheme].primarySecond,
              },
            }}
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
  list: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.7,
    padding: 5,

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
