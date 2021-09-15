import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as itemsActions from "../../../../store/actions/items";
const SelectFilterType = () => {
  const scheme = useSelector((state) => state.config.scheme);
  const [select, setSelect] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(itemsActions.setFilterType(select));
  }, [select]);

  const selectFilter = (type, name) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: Colors[scheme].primary,
          borderRadius: 3,
          paddingVertical: 5,
          width: Dimensions.get("window").width / 4,
        }}
        onPress={() => {
          setSelect(type);
        }}
      >
        <Text
          style={{
            color: Colors[scheme].button,
            fontFamily: "Kanit_600SemiBold",
            textAlign: "center",
            fontSize: 11,
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ ...styles.selectFilterType, ...{} }}>
      <View style={{ ...styles.dateFilter, ...{} }}>
        {selectFilter("date", "DATA")}
      </View>
      <View style={{ ...styles.categoryFilter, ...{} }}>
        {selectFilter("category", "KATEGORIA")}
      </View>
      <View style={{ ...styles.placeFilter, ...{} }}>
        {selectFilter("place", "MIEJSCE")}
      </View>
    </View>
  );
};

export default SelectFilterType;

const styles = StyleSheet.create({
  selectFilterType: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width,
    marginTop: 10,
  },
  dateFilter: {},
  categoryFilter: {},
  placeFilter: {},
});
