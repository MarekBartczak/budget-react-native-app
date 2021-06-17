import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Chart from "../components/Chart";
import FavoritePlaces from "../components/FavoritePlaces";
import AddNewItem from "../components/AddNewItem";
import ButtonRaport from "../components/Button";

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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MainScreen;
