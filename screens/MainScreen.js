import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import Category from "../data/category";
import Items from "../data/dummy-data";
import WeeklyChart from "../components/WeeklyChart";
const MainScreen = (props) => {
  return (
    <View>
      <View style={styles.WeeklyChart}>
        <WeeklyChart press={() => props.navigation.navigate("Date")} />
      </View>

      <Button
        color="red"
        title="Raport"
        onPress={() => props.navigation.navigate("Raport")}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  WeeklyChart: {
    justifyContent: "center",
    alignItems: "center",
  },
});
