import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React from "react";
import Category from "../data/Category";
import Items from "../data/Dummy-data";
import Colors from "../constants/Colors";
import Chart from "../components/Chart";
import FavoritePlaces from "../components/FavoritePlaces";
import AddNewItem from "../components/AddNewItem";
import ButtonRaport from "../components/Button";
const MainScreen = (props) => {
  return (
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
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  screen: {
    // backgroundColor: Colors.banner,
    flex: 1,
  },
});
