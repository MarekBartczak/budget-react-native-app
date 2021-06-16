import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import * as itemsAction from "../store/actions/items";

import DatePicker from "../components/DatePicker";
import PlaceList from "../components/newItems/PlaceList";
import Items from "../data/Dummy-data";
import Colors from "../constants/Colors";
import Receipt from "../components/newMultiItems/Receipt";
import Item from "../models/Item";
import uuid from "react-native-uuid";
import switchComaToDot from "../functions/switchCompaToDot";
import { useDispatch } from "react-redux";
const AddMultiItemsScreen = (props) => {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const clearState = () => {
    setCategory("");
    setCost("");
    setItemName("");
  };

  const placeList = Items.map((el) => el.place);
  const newList = (placeList) =>
    placeList.filter((a, b) => placeList.indexOf(a) === b);
  const workingPlaceList = newList(placeList);

  const getPlaceInfo = (data) => {
    setPlace(data);
  };

  const addItemToTheRecipt = () => {
    const itemObj = new Item(
      uuid.v4(),
      date.toISOString().slice(0, 10),
      place,
      category,
      itemName,
      Number(switchComaToDot(cost))
    );

    dispatch(itemsAction.addItemToTheRecipt(itemObj));

    clearState();
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
            cost={cost}
            onSetCost={setCost}
            itemName={itemName}
            onSetName={setItemName}
            setCategory={setCategory}
            category={category}
            addItemToTheRecipt={() => addItemToTheRecipt()}
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

    height: Dimensions.get("window").height * 0.2,
    width: "90%",
  },
  receipt: {
    marginTop: 30,
    height: Dimensions.get("window").height * 0.5,
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
