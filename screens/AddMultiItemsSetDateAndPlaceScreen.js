import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";

import DatePicker from "../components/DatePicker";
import PlaceList from "../components/newItems/PlaceList";
import Items from "../data/Dummy-data";
import Colors from "../constants/Colors";
import Receipt from "../components/newMultiItems/Receipt";

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
    <KeyboardAvoidingView
    // behavior="position"
    // keyboardVerticalOffset={30}
    // style={styles.container}
    >
      <View style={styles.screen}>
        <View style={styles.datePicker}>
          <DatePicker date={date} onChange={onChangeDate} />
        </View>

        <View style={styles.place}>
          <View style={styles.placeList}>
            <PlaceList data={workingPlaceList} getPlaceInfo={getPlaceInfo} />
          </View>
        </View>
        <View style={styles.receipt}>
          <Receipt
            place={place}
            date={date.toISOString().slice(0, 10)}
            setPlace={setPlace}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
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

    height: 150,
    width: "90%",
  },
  receipt: {
    marginTop: 30,
    height: "50%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
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
});
export default AddMultiItemsScreen;
