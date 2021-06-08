import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={props.style}
        value={props.value}
        autoComplete="off"
        placeholder={props.placeholder}
        autoCapitalize="none"
        keyboardType={props.keyboardType}
        autoCorrect={false}
        enablesReturnKeyAutomatically={true}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
