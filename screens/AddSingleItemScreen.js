import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import Items from "../data/Dummy-data";
import Item from "../models/Item";
import Chart from "../components/Chart";
import uuid from "react-native-uuid";
import DatePicker from "../components/DatePicker";
import PlaceList from "../components/newItems/PlaceList";
import Input from "../components/newItems/Input";
import SeparatorText from "../components/newItems/SeparatorText";
import switchComaToDot from "../functions/switchCompaToDot";
import CategoryList from "../components/newItems/CategoryList";
import { LinearGradient } from "expo-linear-gradient";
import * as itemsAction from "../store/actions/items";
const AddSingleItemScreen = (props) => {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");

  const dispatch = useDispatch();

  const onChangeDate = (event, selectedDate) => {
    let testDate = new Date(selectedDate);
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

  const saveItem = (date, place, category, name, cost) => {
    return new Item(
      uuid.v4(),
      date,
      place,
      category,
      name,
      switchComaToDot(cost)
    );
  };

  const setCategoryState = (data) => {
    setCategory(data);
  };

  const chart = (
    <View>
      <Chart press={() => props.navigation.navigate("Date")} />
    </View>
  );
  const windowHeight = Dimensions.get("window").height;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={30}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient
          colors={[
            Colors.lightBackground.colorTop,
            Colors.lightBackground.colorMiddle,
            Colors.lightBackground.colorBottom,
          ]}
        >
          <View style={styles.screen}>
            {/* Chart depend of windowHeight */}
            {windowHeight > 800 ? chart : null}

            {/* Kiedy View */}
            <SeparatorText style={styles.textSeparator}>Kiedy?</SeparatorText>
            <View style={styles.datePicker}>
              <DatePicker date={date} onChange={onChangeDate} />
            </View>

            {/* Gdzie View */}
            <SeparatorText style={styles.textSeparator}>Gdzie?</SeparatorText>
            <View style={styles.place}>
              <View style={styles.placeList}>
                <PlaceList
                  data={workingPlaceList}
                  getPlaceInfo={getPlaceInfo}
                />
              </View>
            </View>
            {/* Kategorie View */}
            <SeparatorText style={styles.textSeparator}>
              W jakiej kategorii?
            </SeparatorText>
            <View>
              <CategoryList onChangeCategory={setCategoryState} />
            </View>

            {/* Co i za ile View */}
            <SeparatorText style={styles.textSeparator}>
              Co i za ile?
            </SeparatorText>
            <View style={styles.inputs}>
              <Input
                style={styles.input}
                value={itemName}
                placeholder="co?"
                keyboardType={"default"}
                onChangeText={setItemName}
              />
              <Input
                style={styles.input}
                value={cost}
                placeholder="za ile"
                keyboardType={"numeric"}
                onChangeText={setCost}
              />
            </View>

            {/* Button View */}
            <View>
              <Button
                title={"Dodaj"}
                color={Colors.primary}
                onPress={() => {
                  dispatch(
                    itemsAction.addItem(
                      saveItem(date, place, "owoce", itemName, cost)
                    )
                  );
                }}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddSingleItemScreen;

const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },
  gradientBackgroundColor: {},
  datePicker: {
    alignItems: "center",
    justifyContent: "center",
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

  placeList: {
    marginTop: 10,
    flexDirection: "column",
    width: "90%",
    height: 70,
  },
  textSeparator: {
    color: "black",
    fontSize: 15,
    textAlign: "left",
    marginRight: 10,
  },

  inputs: {
    alignItems: "center",
  },

  input: {
    height: 25,
    width: 200,
    borderBottomWidth: 1,
    margin: 5,
    margin: 10,
    color: Colors.primary,
    borderColor: Colors.primary,
  },
  inputPlace: {
    // paddingTop: 25,
    color: Colors.accent,
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    color: Colors.accent,
    fontSize: 18,
    fontWeight: "bold",
  },
});
