import { StyleSheet, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import FavoritePlaces from "../../components/FavoritePlaces";
import AddNewItem from "../../components/AddNewItem";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as favoritePlaceAction from "../../store/actions/favoritePlace";
import chartElement from "../../functions/ChartElement";
import SummaryCost from "../../components/summaryCost/SumaryCost";
import summaryCostCounter from "../../functions/summaryCostCounter";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
const MainScreen = (props) => {
  const selectedPlace = useSelector((state) => state.favoritePlace.selected);
  const itemsFromRedux = useSelector((state) => state.item.items);
  const chartEl = chartElement(itemsFromRedux, 7);
  const dispatch = useDispatch();
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
          <View
            style={{
              marginBottom: 20,
              shadowOffset: { height: 0, width: 0 },
              shadowRadius: 7,
              shadowColor: "black",
              shadowOpacity: 0.2,
            }}
          >
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
              navigateTo={() => props.navigation.navigate("AddMultipleItem")}
              setPlace={() => dispatch(favoritePlaceAction.selectPlace(""))}
              text={"Nowe Wydatki"}
              icon={
                <Ionicons
                  name="ios-cart-outline"
                  size={44}
                  color={Colors.defaultThemeLight.primary}
                />
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
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  addNewItem: {
    alignItems: "center",
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  raport: {
    alignItems: "center",
  },
});

export default MainScreen;
