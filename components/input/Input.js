import { StyleSheet, View, TextInput, useColorScheme } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";

const Input = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

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
        placeholderTextColor={Colors[scheme].primarySecond}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
