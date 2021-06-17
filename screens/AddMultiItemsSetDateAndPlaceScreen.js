import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import DatePicker from "../components/DatePicker";
import PlaceList from "../components/newItems/PlaceList";
import Colors from "../constants/Colors";
import Receipt from "../components/newMultiItems/Receipt";
import Item from "../models/Item";
import uuid from "react-native-uuid";
import switchComaToDot from "../functions/switchCompaToDot";
import * as itemsAction from "../store/actions/items";
import { useDispatch, useSelector } from "react-redux";

const AddMultiItemsScreen = (props) => {
  const itemsFromRedux = useSelector((state) => state.item.items);
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    dispatch(itemsAction.setReceiptDate(date));
  };

  const placeList = itemsFromRedux.map((el) => el.place);
  const newList = (placeList) =>
    placeList.filter((a, b) => placeList.indexOf(a) === b);
  const workingPlaceList = newList(placeList);

  const clearState = () => {
    setCategory("");
    setCost("");
    setItemName("");
  };

  const getPlaceInfo = (data) => {
    setPlace(data);
    dispatch(itemsAction.setReceiptPlace(data));
  };

  const addIntoTheReceipt = () => {
    const itemObj = new Item(
      uuid.v4(),
      date.toISOString().slice(0, 10),
      place,
      category,
      itemName,
      Number(switchComaToDot(cost))
    );
    dispatch(itemsAction.addItemToTheReceipt(itemObj));
    clearState();
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.screen}>
        <View style={styles.datePicker}>
          <DatePicker date={date} onChange={onChangeDate} />
        </View>
        <View style={styles.place}>
          <View style={styles.placeList}>
            <PlaceList
              data={workingPlaceList}
              getPlaceInfo={getPlaceInfo}
              place={place}
            />
          </View>
        </View>
        <View style={styles.receipt}>
          <Receipt
            place={place}
            date={date.toISOString().slice(0, 10)}
            setPlace={getPlaceInfo}
            cost={cost}
            onSetCost={setCost}
            itemName={itemName}
            onSetName={setItemName}
            setCategory={setCategory}
            category={category}
            addItemToTheRecipt={() => addIntoTheReceipt()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
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
