import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as itemsActions from "../../../../store/actions/items";
import { dataLang, selectLang } from "../../../../lang/lang";
const SelectFilterType = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const [select, setSelect] = useState("");
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };

  useEffect(() => {
    dispatch(itemsActions.setFilterType(select));
  }, [select]);

  const clearFilterBy = () => {
    dispatch(itemsActions.setFilter_date(""));
    dispatch(itemsActions.setFilter_mainCategory(""));
    dispatch(itemsActions.setFilter_place(""));
    dispatch(itemsActions.searchElement(""));
  };

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
    <View
      style={{
        ...styles.selectFilterType,
        ...{ backgroundColor: Colors[scheme].backGroundOne },
      }}
    >
      <View style={{ ...styles.dateFilter, ...{} }}>
        {selectFilter("date", translate("DATA").toUpperCase())}
      </View>
      <View style={{ ...styles.categoryFilter, ...{} }}>
        {selectFilter("mainCategory", translate("KATEGORIA").toUpperCase())}
      </View>
      <View style={{ ...styles.placeFilter, ...{} }}>
        {selectFilter("place", translate("MIEJSCE").toUpperCase())}
      </View>
      <View style={{ ...styles.clear, ...{} }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors[scheme].primary,
            borderRadius: 3,
            padding: 1,
          }}
          onPress={() => clearFilterBy()}
        >
          <MaterialIcons name="clear" size={24} color={Colors[scheme].button} />
        </TouchableOpacity>
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
    paddingVertical: 20,
    marginTop: -1,
  },
  dateFilter: {},
  categoryFilter: {},
  placeFilter: {},
  clear: {
    justifyContent: "center",
  },
});
