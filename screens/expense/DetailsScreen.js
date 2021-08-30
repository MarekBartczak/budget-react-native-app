import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as itemsAction from "../../store/actions/items";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";

const DetailsScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const { date, place, category, name, cost, id, multiply } =
    props.route.params;
  const userId = useSelector((state) => state.auth.userID);

  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(itemsAction.delItem(id, userId));
    props.navigation.navigate("Home");
  };
  return (
    <ExternalComponent>
      <View style={styles.screen}>
        <View
          style={{
            ...styles.dateView,
            ...{ backgroundColor: Colors[scheme].button },
          }}
        >
          <View style={styles.trash}></View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Date", { selectedDate: date })
            }
          >
            <Text
              style={{ ...styles.date, ...{ color: Colors[scheme].primary } }}
            >
              {date}
            </Text>
          </TouchableOpacity>

          <View style={styles.trash}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Uwaga!",
                  "Czy usunąć?",
                  [
                    { text: "Nie", style: "cancel" },
                    { text: "Tak", onPress: () => deleteItem() },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Ionicons
                name="ios-trash"
                size={24}
                color={Colors[scheme].primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            ...styles.middleSection,
            ...{ backgroundColor: Colors[scheme].primaryThird },
          }}
        >
          {/* first column */}
          <View style={styles.placeAndCategory}>
            <View style={styles.placeView}>
              <Text
                style={{
                  ...{ color: Colors[scheme].primarySecond },
                }}
              >
                Miejsce
              </Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Place", { place: place })
                }
              >
                <Text
                  style={{
                    ...styles.place,
                    ...{ color: Colors[scheme].primarySecond },
                  }}
                >
                  {place}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryView}>
              <Text
                style={{
                  ...{ color: Colors[scheme].primarySecond },
                }}
              >
                Kategoria
              </Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Category", { category: category })
                }
              >
                <Text
                  style={{
                    ...styles.category,
                    ...{ color: Colors[scheme].primarySecond },
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* middle column */}
          <View style={styles.detailsMiddleCenter}>
            <View style={styles.nameView}>
              <Text
                style={{
                  ...styles.name,
                  ...{ color: Colors[scheme].primarySecond },
                }}
              >
                {name}{" "}
                <Text style={{ fontWeight: "normal" }}>[x{multiply}]</Text>
              </Text>
            </View>
            <View style={styles.costView}>
              <Text
                style={{
                  ...styles.cost,
                  ...{ color: Colors[scheme].primarySecond },
                }}
              >
                {cost}zł{" "}
                <Text style={{ fontWeight: "normal" }}>
                  [{cost * multiply}zł]
                </Text>
              </Text>
            </View>
          </View>
          {/* third column */}
          <View style={styles.thirdColumn}></View>
        </View>
      </View>
    </ExternalComponent>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screen: {
    alignContent: "center",
    padding: 30,
    borderRadius: 10,
    width: "100%",
  },
  dateView: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontWeight: "bold",
    fontSize: 24,
  },
  middleSection: {
    marginVertical: 20,
    height: 180,
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,

    flexDirection: "column",
    justifyContent: "space-between",
  },
  placeAndCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeView: {
    flexDirection: "column",
    marginLeft: 10,
    alignItems: "center",
  },
  place: {
    fontWeight: "bold",
  },
  categoryView: {
    flexDirection: "column",
    marginRight: 10,
    alignItems: "center",
  },
  thirdColumn: {
    justifyContent: "space-between",
  },
  trash: {
    alignItems: "center",
    width: 30,
  },
  category: {
    fontWeight: "bold",
  },
  nameView: {
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    padding: 20,
    fontWeight: "bold",
    // color: Colors.primary,
    margin: 10,
    textAlign: "center",
  },
  costView: {
    justifyContent: "center",
    flexDirection: "row",
  },
  cost: {
    fontWeight: "bold",
    // color: "black",
    fontSize: 15,
    paddingVertical: 10,
  },
  detailsMiddleCenter: {
    justifyContent: "flex-end",
  },
});
