import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import Colors from "../../constants/Colors";

const headerScreenComponent = (props) => {
  return {
    headerLeft: () => (
      <TouchableOpacity
        style={styles.header}
        onPress={() => props.navigation.toggleDrawer()}
      >
        <MaterialCommunityIcons name="menu" size={34} color={Colors.primary} />
      </TouchableOpacity>
    ),
  };
};

export default headerScreenComponent;

const styles = StyleSheet.create({
  header: {
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
});
