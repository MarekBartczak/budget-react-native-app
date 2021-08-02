import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import Chart from "../../components/chart/Chart";
import FavoritePlaces from "../../components/FavoritePlaces";
import AddNewItem from "../../components/AddNewItem";
import { useSelector } from "react-redux";
import chartElement from "../../functions/ChartElement";
import SummaryCost from "../../components/summaryCost/SumaryCost";
import summaryCostCounter from "../../functions/summaryCostCounter";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
const MainScreen = (props) => {
  const selectedPlace = useSelector((state) => state.favoritePlace.selected);
  const itemsFromRedux = useSelector((state) => state.item.items);
  const chartEl = chartElement(itemsFromRedux, 7);

  return (
    <ExternalComponent>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.screen}>
          <View style={{ marginBottom: 20 }}>
            <SummaryCost cost={summaryCostCounter(itemsFromRedux)} />
          </View>
          <View>
            <Chart
              press={() => props.navigation.navigate("Date")}
              label={chartEl.label}
              data={chartEl.data}
            />
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
        </View>
      </View>
    </ExternalComponent>
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
});

export default MainScreen;
