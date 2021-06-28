import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Chart from "../components/Chart";
import FavoritePlaces from "../components/FavoritePlaces";
import AddNewItem from "../components/AddNewItem";
import ButtonComponent from "../components/buttons/Button";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const MainScreen = (props) => {
  const selectedPlace = useSelector((state) => state.favoritePlace.selected);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <LinearGradient
        colors={[
          Colors.gradientBackground.primary,
          Colors.gradientBackground.secondary,
        ]}
        style={styles.background}
      />
      <View style={styles.screen}>
        {/* <ScrollView> */}
        <View>
          <Chart press={() => props.navigation.navigate("Date")} />
        </View>
        <View style={styles.favoritePlace}>
          <FavoritePlaces
            onPress={() => props.navigation.navigate("FavoritePlace")}
            pressToAddMultiItems={() =>
              props.navigation.navigate("AddMultipleItem", {
                favPlaceName: selectedPlace,
              })
            }
          />
        </View>

        <View style={styles.addNewItem}>
          <AddNewItem
            pressToAddSignleItem={() =>
              props.navigation.navigate("AddSingleItem")
            }
            pressToAddMultiItems={() =>
              props.navigation.navigate("AddMultipleItem")
            }
          />
        </View>

        <View style={styles.raport}>
          <ButtonComponent
            onPress={() => props.navigation.navigate("Raport")}
            text="Raport"
          />
        </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  favoritePlace: {
    alignItems: "center",
  },
  addNewItem: {
    alignItems: "center",
  },
  raport: {
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});

export default MainScreen;
