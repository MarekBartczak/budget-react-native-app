import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ItemListToAdd from "../items/itemListToAdd";
import Colors from "../../constants/Colors";

const PlaceList = (props) => {
  const [isFavoritePlaceShow, setIsFavoritePlaceShow] = useState(false);

  const setBtnColor = (state) => {
    if (state === false) {
      return Colors.primary;
    }
    if (state === true) {
      return Colors.accent;
    }
  };

  const allList = (
    <FlatList
      nestedScrollEnabled
      data={props.data}
      keyExtractor={(item) => item}
      renderItem={(list) => (
        <ItemListToAdd
          list={list.item}
          setPlace={props.getPlaceInfo}
          place={props.place}
        />
      )}
    />
  );

  const favList = (
    <FlatList
      nestedScrollEnabled
      data={props.favData}
      keyExtractor={(item) => item}
      renderItem={(list) => (
        <ItemListToAdd
          list={list.item}
          setPlace={props.getPlaceInfo}
          place={props.place}
        />
      )}
    />
  );
  return (
    <View>
      <View style={styles.switchBtns}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setIsFavoritePlaceShow(false);
          }}
        >
          <View>
            <Text style={{ color: setBtnColor(!isFavoritePlaceShow) }}>
              Wszystkie
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setIsFavoritePlaceShow(true);
          }}
        >
          <View>
            <Text style={{ color: setBtnColor(isFavoritePlaceShow) }}>
              Ulubione
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {isFavoritePlaceShow ? favList : allList}
    </View>
  );
};

export default PlaceList;

const styles = StyleSheet.create({
  switchBtns: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btn: {
    width: 100,
    // height: 40,
    marginBottom: 10,
  },
});
