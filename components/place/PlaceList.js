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
      return null;
    }
    if (state === true) {
      return "bold";
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
      data={props.imageUrl}
      keyExtractor={(item) => item.name}
      renderItem={(list) => (
        <ItemListToAdd
          list={list.item.name}
          setPlace={props.getPlaceInfo}
          place={props.place}
          imageUrl={list.item.logo}
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
            <Text style={{ fontWeight: setBtnColor(!isFavoritePlaceShow) }}>
              Zapisane
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
            <Text style={{ fontWeight: setBtnColor(isFavoritePlaceShow) }}>
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
    marginBottom: 10,
  },
});
