import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
const SearchEngine = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const [search, setSearch] = useState();
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
    alignItems: "center",
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
    height: Dimensions.get("window").height * 0.05,
    padding: 10,
    borderRadius: 3,
  },
  input: { width: Dimensions.get("window").width - 50, marginTop: 20 },
});
