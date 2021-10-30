import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as expenseActions from "../../../store/actions/items";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import fontScale from "../../../constants/FontScale";
import { dataLang, selectLang } from "../../../lang/lang";

import Colors from "../../../constants/Colors";
const SearchEngine = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const filterCount = useSelector((state) => state.item.filter.count);
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
  const [search, setSearch] = useState();
  const dispatch = useDispatch();

  const clearFilterBy = () => {
    setSearch("");
    dispatch(expenseActions.searchElement(""));
  };
  const setSearchFilter = () => {
    dispatch(expenseActions.searchElement(search));
  };
  return (
    <View
      style={{
        ...styles.searchEngine,
        ...{},
      }}
    >
      <View
        style={{
          ...styles.input,
          ...{ backgroundColor: Colors[scheme].backGroundOne },
        }}
      >
        <TextInput
          style={{
            ...styles.textInput,
            ...{
              backgroundColor: Colors[scheme].primary,
              color: Colors[scheme].primarySecond,
            },
          }}
          value={search}
          autoComplete="off"
          autoCapitalize="none"
          keyboardType="default"
          placeholder="FILTRUJ"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          placeholderTextColor={Colors[scheme].primaryThird}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          onPress={() => setSearchFilter()}
          style={{
            ...styles.btn,
            ...{ backgroundColor: Colors[scheme].primary },
          }}
        >
          <Text
            style={{
              color: Colors[scheme].button,
              fontFamily: "Kanit_600SemiBold",
              fontSize: fontScale(5),
            }}
          >
            {translate("SZUKAJ").toUpperCase()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            backgroundColor: Colors[scheme].primary,
            borderRadius: 3,
            padding: 5,
          }}
          onPress={() => clearFilterBy()}
        >
          <MaterialIcons
            name="clear"
            size={fontScale(5)}
            color={Colors[scheme].button}
          />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.result, ...{} }}>
        <Text
          style={{
            ...styles.resultText,
            ...{ color: Colors[scheme].primarySecond, fontSize: fontScale(6) },
          }}
        >
          {translate("ZNALEZIONO")}:{"  "}
          <Text
            style={{
              color: Colors[scheme].button,
              fontFamily: "Kanit_600SemiBold",
              fontSize: fontScale(6),
            }}
          >
            {filterCount.items}
          </Text>
        </Text>
        <Text
          style={{
            ...styles.resultText,
            ...{ color: Colors[scheme].primarySecond, fontSize: fontScale(6) },
          }}
        >
          {translate("KWOTA")} :{"  "}
          <Text
            style={{
              color: Colors[scheme].button,
              fontFamily: "Kanit_600SemiBold",
              fontSize: fontScale(6),
            }}
          >
            {filterCount.cost.toFixed(2)}
            <Text style={{ fontSize: fontScale(6) }}> PLN</Text>
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SearchEngine;

const styles = StyleSheet.create({
  searchEngine: {
    width: Dimensions.get("window").width,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: -1,
  },
  result: {
    width: Dimensions.get("window").width,
    marginTop: 25,
  },
  resultText: {
    fontFamily: "Kanit_600SemiBold",
    marginLeft: 25,
    fontSize: 20,
  },
  textInput: {
    paddingHorizontal: 10,
    borderRadius: 3,
    width: Dimensions.get("window").width * 0.7,
    fontSize: fontScale(5),
  },
  input: {
    width: Dimensions.get("window").width,
    paddingVertical: 20,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  btn: {
    padding: 10,
    borderRadius: 3,
  },
});
