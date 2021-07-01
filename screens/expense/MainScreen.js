import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import Chart from "../../components/chart/Chart";
import FavoritePlaces from "../../components/FavoritePlaces";
import AddNewItem from "../../components/AddNewItem";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import chartElement from "../../functions/ChartElement";
import SummaryCost from "../../components/summaryCost/SumaryCost";
import summaryCostCounter from "../../functions/summaryCostCounter";
const MainScreen = (props) => {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // it have to be refacor because looks very ugly!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const selectedPlace = useSelector((state) => state.favoritePlace.selected);
  const itemsFromRedux = useSelector((state) => state.item.items);

  const chartEl = chartElement(itemsFromRedux, 6);

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
          <Chart
            press={() => props.navigation.navigate("Date")}
            label={chartEl.label}
            data={chartEl.data}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <SummaryCost cost={summaryCostCounter(itemsFromRedux)} />
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

        {/* <View style={styles.raport}>
          <ButtonComponent
            onPress={() => props.navigation.navigate("Raport")}
            text="Raport"
          />
        </View> */}
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
