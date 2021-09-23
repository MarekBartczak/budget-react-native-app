import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Settings = (props) => {
  const navigation = useNavigation();

  const scheme = useSelector((state) => state.config.scheme);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(props.target);
      }}
      style={{
        ...styles.element,
        ...{ backgroundColor: Colors[scheme].primary },
      }}
    >
      <View
        style={{
          ...styles.icon,
          ...{ backgroundColor: Colors[scheme].backGroundOne },
        }}
      >
        {props.icon}
      </View>
      <View style={styles.textView}>
        <Text style={styles.textElement}>{props.title}</Text>
      </View>
      <View style={styles.iconArrow}>
        <Feather
          name="chevrons-right"
          size={24}
          color={Colors[scheme].primaryThird}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Settings;

const styles = StyleSheet.create({
  textElement: {
    width: Dimensions.get("window").width * 0.5,
    fontFamily: "Kanit_400Regular",
    fontSize: 25,
    textAlign: "center",
  },
  textView: {
    height: Dimensions.get("window").width * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconArrow: {
    height: Dimensions.get("window").width * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  element: {
    marginBottom: 5,
    width: Dimensions.get("window").width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderRadius: 20,
  },
});
