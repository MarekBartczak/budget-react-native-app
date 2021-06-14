import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import DatePicker from "../components/DatePicker";
import PlaceList from "../components/newItems/PlaceList";
import Items from "../data/Dummy-data";
import Colors from "../constants/Colors";
import NewElement from "../components/newMultiItems/NewElement";

const AddMultiItemsScreen = (props) => {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const placeList = Items.map((el) => el.place);
  const newList = (placeList) =>
    placeList.filter((a, b) => placeList.indexOf(a) === b);
  const workingPlaceList = newList(placeList);

  const getPlaceInfo = (data) => {
    setPlace(data);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.datePicker}>
        <DatePicker date={date} onChange={onChangeDate} />
      </View>
      <View style={styles.place}>
        <View style={styles.placeList}>
          <PlaceList data={workingPlaceList} getPlaceInfo={getPlaceInfo} />
        </View>
      </View>
      {/* <View style={styles.itemsList}></View> */}
      <View style={styles.inputArea}>
        <NewElement />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // alignItems: "center",
    height: "100%",
    width: "100%",
  },
  placeList: {
    marginTop: 10,

    height: 70,
    width: "90%",
  },
  place: {
    width: "100%",
    flexDirection: "column",

    justifyContent: "space-around",
    alignItems: "center",
    shadowOffset: { height: 0, width: 10 },
    shadowColor: Colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  inputArea: {
    width: "100%",
    height: 500,
  },
});
export default AddMultiItemsScreen;
