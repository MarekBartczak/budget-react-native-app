import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as itemsAction from "../../store/actions/items";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";

const DetailsScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const { date, place, mainCategory, subCategory, cost, id } =
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
            ...{ borderColor: Colors[scheme].primary },
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Date", { selectedDate: date })
            }
          >
            <Text
              style={{
                ...styles.date,
                ...{ color: Colors[scheme].button },
              }}
            >
              {date.replace(/-/g, ".")}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              ...styles.trash,
              ...{ backgroundColor: Colors[scheme].primary, padding: 10 },
            }}
          >
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
                color={Colors[scheme].button}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            ...styles.middleSection,
            ...{ borderColor: Colors[scheme].primaryThird },
          }}
        >
          {/* first column */}
          <View style={styles.placeAndCategory}>
            <View style={styles.placeView}>
              <Text
                style={{
                  ...{
                    color: Colors[scheme].primaryThird,
                    fontFamily: "Kanit_600SemiBold",
                  },
                }}
              >
                {"Miejsce".toUpperCase()}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Place", { place: place })
                }
              >
                <Text
                  style={{
                    ...styles.place,
                    ...{ color: Colors[scheme].button },
                  }}
                >
                  {place}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryView}>
              <Text
                style={{
                  ...styles.category,
                  ...{
                    color: Colors[scheme].primaryThird,
                    fontFamily: "Kanit_600SemiBold",
                  },
                }}
              >
                {mainCategory.toUpperCase()}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Category", {
                    subCategory: subCategory,
                  })
                }
              >
                <Text
                  style={{
                    ...styles.category,
                    ...{
                      color: Colors[scheme].button,
                      fontFamily: "Kanit_400Regular",
                    },
                  }}
                >
                  {subCategory.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailsMiddleCenter}>
            <View style={styles.costView}>
              <Text
                style={{
                  ...styles.cost,
                  ...{
                    color: Colors[scheme].primarySecond,
                    fontFamily: "Kanit_600SemiBold",
                  },
                }}
              >
                {cost}zł{" "}
              </Text>
            </View>
          </View>
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
    borderRadius: 10,
    width: Dimensions.get("window").width,
  },
  dateView: {
    alignItems: "center",
    padding: 30,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  date: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 20,
  },
  middleSection: {
    marginTop: 10,
    height: 180,
    width: Dimensions.get("window").width,
    borderRadius: 10,
    borderBottomWidth: 1,
    // shadowColor: "black",
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,

    flexDirection: "column",
    justifyContent: "space-between",
  },
  placeAndCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeView: {
    flexDirection: "column",
    marginLeft: 20,
    alignItems: "center",
  },
  place: {
    fontWeight: "bold",
  },
  categoryView: {
    flexDirection: "column",
    marginRight: 20,
    alignItems: "center",
  },
  thirdColumn: {
    justifyContent: "space-between",
  },
  trash: {
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
    // color: "black",
    fontSize: 25,
    paddingVertical: 10,
  },
  detailsMiddleCenter: {
    justifyContent: "flex-end",
  },
});
