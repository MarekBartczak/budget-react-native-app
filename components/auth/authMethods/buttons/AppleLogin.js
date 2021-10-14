// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
const AppleLogin = (props) => {
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);
  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
  }, []);
  return (
    // <TouchableOpacity
    //   onPress={props.press}
    //   style={{
    //     marginTop: 20,
    //     backgroundColor: "black",

    //     justifyContent: "center",
    //     alignItems: "center",
    //     flexDirection: "row",
    //     paddingVertical: 10,
    //     borderRadius: 10,
    //   }}
    // >
    //   <AntDesign name="apple1" size={24} color="white" />
    //   <Text
    //     style={{
    //       color: "white",
    //       fontFamily: "Kanit_600SemiBold",
    //       paddingLeft: 10,
    //     }}
    //   >
    //     ZLOGUJ PRZEZ APPLE
    //   </Text>
    // </TouchableOpacity>
    <React.Fragment>
      {isAppleLoginAvailable && (
        <View style={{ alignItems: "center" }}>
          <AppleAuthentication.AppleAuthenticationButton
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            cornerRadius={25}
            onPress={props.press}
            style={{ width: "100%", height: 50 }}
          />
        </View>
      )}
    </React.Fragment>
  );
};

export default AppleLogin;

// const styles = StyleSheet.create({});
