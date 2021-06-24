import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Chart from "../components/Chart";
import FavoritePlaces from "../components/FavoritePlaces";
import AddNewItem from "../components/AddNewItem";
import ButtonComponent from "../components/buttons/Button";
import { useSelector } from "react-redux";

const MainScreen = (props) => {
  const selectedPlace = useSelector((state) => state.favoritePlace.selected);
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
              pressToAddMultiItems={() =>
                props.navigation.navigate("AddMultipleItem", {
                  favPlaceName: selectedPlace,
                })
              }
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
            <ButtonComponent
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
