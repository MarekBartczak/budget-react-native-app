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
import { useSelector } from "react-redux";

const PlaceList = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

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
          style={{
            ...styles.btn,
            ...{ backgroundColor: Colors[scheme].button },
          }}
          onPress={() => {
            setIsFavoritePlaceShow(false);
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: setBtnColor(!isFavoritePlaceShow),
                color: Colors[scheme].primaryThird,
                textAlign: "center",
                paddingVertical: 3,
              }}
            >
              Zapisane
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.btn,
            ...{ backgroundColor: Colors[scheme].button },
          }}
          onPress={() => {
            setIsFavoritePlaceShow(true);
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: setBtnColor(isFavoritePlaceShow),
                color: Colors[scheme].primaryThird,
                textAlign: "center",
                paddingVertical: 3,
              }}
            >
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
    justifyContent: "center",
  },
  btn: {
    margin: 10,
    width: 100,
    marginBottom: 10,
    borderRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
});
