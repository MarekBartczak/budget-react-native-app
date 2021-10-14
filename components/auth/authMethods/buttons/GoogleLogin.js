import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";

const AppleLogin = (props) => {
  return (
    <TouchableOpacity
      onPress={props.press}
      style={{
        backgroundColor: Colors.dark.google,

        marginTop: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
        borderRadius: 25,
      }}
    >
      <AntDesign name="google" size={24} color="white" />
      <Text
        style={{
          color: "white",
          fontFamily: "Kanit_600SemiBold",
          paddingLeft: 10,
        }}
      >
        ZLOGUJ PRZEZ GOOGLE
      </Text>
    </TouchableOpacity>
  );
};

export default AppleLogin;

const styles = StyleSheet.create({});
