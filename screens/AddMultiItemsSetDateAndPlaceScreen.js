import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import DatePicker from "../components/DatePicker";
import PlaceList from "../components/place/PlaceList";
import Colors from "../constants/Colors";
import Receipt from "../components/newMultiItems/Receipt";
import MultiItem from "../models/MultiItem";
import uuid from "react-native-uuid";
import switchComaToDot from "../functions/switchCompaToDot";
import * as itemsAction from "../store/actions/items";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const AddMultiItemsScreen = (props) => {
  const selectedPlace = useSelector((state) => state.favoritePlace.selected);
  const favList = useSelector((state) => state.favoritePlace.favoritePlace);
  const itemsFromRedux = useSelector((state) => state.item.items);

  const dispatch = useDispatch();

  const favListNames = favList.map((el) => el.name);
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState(selectedPlace);
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    dispatch(itemsAction.setReceiptDate(currentDate));
  };

  useEffect(() => {
    dispatch(itemsAction.setReceiptDate(date));
  }, [date]);

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
    const itemObj = new MultiItem(
      uuid.v4(),
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
        <LinearGradient
          colors={[
            Colors.gradientBackground.primary,
            Colors.gradientBackground.secondary,
          ]}
          style={styles.background}
        />
        <View style={styles.datePicker}>
          <DatePicker date={date} onChange={onChangeDate} />
        </View>
        <View style={styles.place}>
          <View style={styles.placeList}>
            <PlaceList
              favData={favListNames}
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
            backToHome={() => props.navigation.navigate("Home")}
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
    marginBottom: 10,
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
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});
export default AddMultiItemsScreen;
