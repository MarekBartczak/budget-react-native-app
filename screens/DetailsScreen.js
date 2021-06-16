import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as itemsAction from "../store/actions/items";

const DetailsScreen = (props) => {
  const { date, place, category, name, cost, id } = props.route.params;
  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch(itemsAction.delItem(id));
    props.navigation.navigate("Home");
    // console.log(name);
    // console.log(id);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.dateView}>
        <View style={styles.trash}></View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Date", { selectedDate: date })
          }
        >
          <Text style={styles.date}>{date}</Text>
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
            <Ionicons name="ios-trash" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.middleSection}>
        {/* first column */}
        <View style={styles.placeAndCategory}>
          <View style={styles.placeView}>
            <Text>Miejsce</Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Place", { place: place })
              }
            >
              <Text style={styles.place}>{place}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryView}>
            <Text>Kategoria</Text>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Category", { category: category })
              }
            >
              <Text style={styles.category}>{category}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* middle column */}
        <View style={styles.detailsMiddleCenter}>
          <View style={styles.nameView}>
            <Text style={styles.name}>{name}</Text>
          </View>

          <View style={styles.costView}>
            <Text style={styles.cost}>{cost}zł</Text>
          </View>
        </View>

        {/* third column */}
        <View style={styles.thirdColumn}></View>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screen: {
    alignContent: "center",
    // flex: 1,

    margin: 30,
    backgroundColor: "white",
    // shadowColor: "black",
    // shadowOffset: { height: 5, width: 0 },
    // shadowOpacity: 0.24,
    // shadowRadius: 10,
    borderRadius: 10,
  },
  dateView: {
    alignItems: "center",
    backgroundColor: Colors.banner,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.primary,
  },
  middleSection: {
    marginVertical: 20,
    height: 180,

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
    // marginBottom: 20,
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
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primary,
    margin: 10,
    textAlign: "center",
  },
  costView: {
    justifyContent: "center",
    flexDirection: "row",
  },
  cost: {
    fontWeight: "bold",
    color: Colors.accent,
    fontSize: 24,
    paddingVertical: 10,
  },
  detailsMiddleCenter: {
    justifyContent: "flex-end",
  },
});
