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
import Colors from "../../../constants/Colors";
const SearchEngine = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const [search, setSearch] = useState();
  const dispatch = useDispatch();

  const setSearchFilter = () => {
    dispatch(expenseActions.searchElement(search));
  };
  return (
    <View style={{ ...styles.searchEngine, ...{} }}>
      <View style={{ ...styles.input, ...{} }}>
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
            10
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
            123 <Text>zł</Text>
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
    marginTop: 20,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  btn: {
    padding: 10,
    borderRadius: 3,
  },
});
