import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import React, { useEffect, useCallback } from "react";
import Category from "../data/Category";
// import Items from "../data/Dummy-data";
import Colors from "../constants/Colors";
import Chart from "../components/Chart";
import FavoritePlaces from "../components/FavoritePlaces";
import AddNewItem from "../components/AddNewItem";
import ButtonRaport from "../components/Button";
import { useSelector } from "react-redux";

const MainScreen = (props) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
      <View style={styles.screen}>
        <ScrollView>
          <View>
            <Chart press={() => props.navigation.navigate("Date")} />
          </View>
          <View>
            <FavoritePlaces
              onPress={() => props.navigation.navigate("FavoritePlace")}
            />
          </View>
          <View>
            <AddNewItem
              pressToAddSignleItem={() =>
                props.navigation.navigate("AddSingleItem")
              }
              pressToAddMultiItems={() =>
                props.navigation.navigate("AddMultipleItem")
              }
            />
          </View>

          <View>
            <ButtonRaport
              onPress={() => props.navigation.navigate("Raport")}
              text="Raport"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  screen: {
    // backgroundColor: Colors.banner,
    flex: 1,
  },
});
