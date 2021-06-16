import { View, FlatList } from "react-native";
import React from "react";
import ItemListToAdd from "./itemListToAdd";

const PlaceList = (props) => {
  return (
    <View>
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
    </View>
  );
};

export default PlaceList;
