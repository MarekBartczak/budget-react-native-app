import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const DetailsScreen = (props) => {
  const { date, place, category, name, cost } = props.route.params;
  return (
    <View style={styles.screen}>
      <View style={styles.dateView}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Date", { selectedDate: date })
          }
        >
          <Text style={styles.date}>{date}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.middleSection}>
        <View style={styles.placeView}>
          <Text>Miejsce</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Place", { place: place })}
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

      <View style={styles.nameView}>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.costView}>
        <Text style={styles.cost}>{cost}zł</Text>
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
  },
  date: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.primary,
  },
  middleSection: {
    marginVertical: 20,

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
});
