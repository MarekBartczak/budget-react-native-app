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

import Colors from "../../../constants/Colors";
const SearchEngine = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const filterCount = useSelector((state) => state.item.filter.count);

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
              borderColor: Colors[scheme].primarySecond,
              backgroundColor: Colors[scheme].primary,
              color: Colors[scheme].primarySecond,
            },
          }}
          value={search}
          autoComplete="off"
          placeholder="WPISZ"
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
            }}
          >
            SZUKAJ
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
          <MaterialIcons name="clear" size={24} color={Colors[scheme].button} />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.result, ...{} }}>
        <Text
          style={{
            ...styles.resultText,
            ...{ color: Colors[scheme].primarySecond },
          }}
        >
          ZNALEZIONO:{"  "}
          <Text
            style={{
              color: Colors[scheme].button,
              fontFamily: "Kanit_600SemiBold",
              fontSize: 20,
            }}
          >
            {filterCount.items}
          </Text>
        </Text>
        <Text
          style={{
            ...styles.resultText,
            ...{ color: Colors[scheme].primarySecond },
          }}
        >
          KWOTA :{"  "}
          <Text
            style={{
              color: Colors[scheme].button,
              fontFamily: "Kanit_600SemiBold",
              fontSize: 20,
            }}
          >
            {filterCount.cost.toFixed(2)}
            <Text>zł</Text>
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
    // alignItems: "center",
    justifyContent: "center",
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
    padding: 10,
    borderRadius: 3,
    width: Dimensions.get("window").width * 0.7,
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
