import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import ItemListToAdd from "../items/itemListToAdd";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import fontScale from "../../constants/FontScale";
import { dataLang, selectLang } from "../../lang/lang";

const PlaceList = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
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
    <View
      style={{
        backgroundColor: Colors[scheme].backGroundOne,
        paddingBottom: 15,
        borderBottomRightRadius: Dimensions.get("window").width / 5,
        borderBottomLeftRadius: Dimensions.get("window").width / 5,
        shadowColor: Colors[scheme].drawerActive,
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        marginBottom: 15,
        elevation: 7,
      }}
    >
      <View
        style={{
          ...styles.switchBtns,
          ...{ backgroundColor: Colors[scheme].backGroundOne },
        }}
      >
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
                fontSize: fontScale(6),
              }}
            >
              {translate("Zapisane").toUpperCase()}
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
                fontSize: fontScale(6),
                // fontFamily: "Kanit_600SemiBold",
              }}
            >
              {translate("Ulubione").toUpperCase()}
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
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    margin: 10,
    width: 100,
    marginBottom: 10,
    borderRadius: 3,
    // shadowOffset: { height: 0, width: 0 },
    // shadowRadius: 7,
    // shadowColor: "black",
    // shadowOpacity: 0.2,
  },
});
