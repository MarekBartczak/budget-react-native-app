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
      return "Kanit_400Regular";
    }
    if (state === true) {
      return "Kanit_600SemiBold";
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
            ...{ backgroundColor: Colors[scheme].primary },
          }}
          onPress={() => {
            setIsFavoritePlaceShow(false);
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: setBtnColor(!isFavoritePlaceShow),
                color: Colors[scheme].button,
                textAlign: "center",
                paddingVertical: 3,
                // fontFamily: "Kanit_600SemiBold",
              }}
            >
              {"Zapisane".toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.btn,
            ...{ backgroundColor: Colors[scheme].primary },
          }}
          onPress={() => {
            setIsFavoritePlaceShow(true);
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: setBtnColor(isFavoritePlaceShow),
                color: Colors[scheme].button,
                textAlign: "center",
                paddingVertical: 3,
                // fontFamily: "Kanit_600SemiBold",
              }}
            >
              {"Ulubione".toUpperCase()}
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
    borderRadius: 1,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
});
