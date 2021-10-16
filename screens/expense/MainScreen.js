import { StyleSheet, View } from "react-native";
import React from "react";
import Chart from "../../components/chart/Chart";
import FavoritePlaces from "../../components/FavoritePlaces";
import AddNewItem from "../../components/AddNewItem";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as favoritePlaceAction from "../../store/actions/favoritePlace";
import chartElement from "../../functions/ChartElement";
import SummaryCost from "../../components/summaryCost/SummaryCost";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";

const MainScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const selectedPlace = useSelector((state) => state.favoritePlace.selected);
  const itemsFromRedux = useSelector((state) => state.item.items);
  const chartEl = chartElement(itemsFromRedux);
  const dispatch = useDispatch();
  const type = "expense";

  return (
    <ExternalComponent>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: Colors[scheme].light,
        }}
      >
        <View style={styles.screen}>
          <View style={{}}>
            <SummaryCost type={type} list={itemsFromRedux} />
          </View>
          <View style={styles.component}>
            <Chart
              type={type}
              press={() => props.navigation.navigate("ExpenseList")}
              obj={chartEl}
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
              text={"Nowe Wydatki".toUpperCase()}
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
    marginTop: 25,
    bottom: 0,

    alignItems: "center",
  },
  raport: {
    alignItems: "center",
  },
  component: {
    overflow: "hidden",
    paddingBottom: 15,
  },
});

export default MainScreen;
