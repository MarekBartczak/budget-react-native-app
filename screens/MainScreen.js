import { StyleSheet, Text, View, Button } from "react-native";

import React from "react";
const MainScreen = (props) => {
  return (
    <View>
      <Text>Main</Text>
      <Button
        title="details"
        onPress={() => props.navigation.navigate("Details")}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
