import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React from "react";
import Category from "../data/Category";
import Items from "../data/Dummy-data";
import Colors from "../constants/Colors";
import Chart from "../components/Chart";
import FavoritePlaces from "../components/FavoritePlaces";
import AddNewItem from "../components/AddNewItem";
const MainScreen = (props) => {
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View>
          <Chart press={() => props.navigation.navigate("Date")} />
        </View>
        <View>
          <FavoritePlaces />
        </View>
        <View>
          <AddNewItem
            pressToAddSignleItem={() =>
              props.navigation.navigate("AddSingleItem")
            }
          />
        </View>

        <Button
          color={Colors.primary}
          title="Raport"
          onPress={() => props.navigation.navigate("Raport")}
        />
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
