import { StyleSheet, View, Dimensions, useColorScheme } from "react-native";
import React, { useState, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import MonthChart from "../../components/chart/MonthChart";
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
  const category = useSelector((state) => state.item);
  const chartEl = chartElement(itemsFromRedux);
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
            <SummaryCost
              cost={summaryCostCounter(itemsFromRedux)}
              dateList={itemsFromRedux}
            />
          </View>
          <View style={styles.component}>
            <Chart
              press={() => props.navigation.navigate("Date")}
              label={chartEl.label}
              data={chartEl.data}
            />
          </View>
          {/* <View style={styles.component}>
            <MonthChart
              press={() => props.navigation.navigate("Date")}
              label={chartEl.label}
              data={chartEl.data}
            />
          </View> */}
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
    position: "absolute",
    bottom: 40,
    marginLeft: Dimensions.get("window").width * 0.2,

    alignItems: "center",
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.5,
  },
  raport: {
    alignItems: "center",
  },
  component: {
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
});

export default MainScreen;
