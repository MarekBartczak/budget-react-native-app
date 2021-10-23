import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EmptyList = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <View
      style={{
        height: Dimensions.get("window").height * 0.25,
        width: Dimensions.get("window").width,
        backgroundColor: Colors[scheme].backGroundOne,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        shadowColor: Colors[scheme].drawerActive,
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        paddingBottom: 45,
        alignItems: "center",
        elevation: 7,
      }}
    >
      <MaterialCommunityIcons
        name="spider-web"
        size={100}
        color={Colors[scheme].headerTintColor}
      />
      <MaterialCommunityIcons
        name="spider-thread"
        size={24}
        color={Colors[scheme].headerTintColor}
      />
      <Text
        style={{
          color: Colors[scheme].headerTintColor,
          marginTop: 10,
          fontFamily: "Kanit_600SemiBold",
        }}
      >
        NIE DODANO JESZCZE NIC
      </Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({});
