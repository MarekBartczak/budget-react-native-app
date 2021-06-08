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

const AddSingleItemScreen = (props) => {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");

  const onChangeDate = (selectedDate) => {
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

  const chart = (
    <View>
      <Chart press={() => props.navigation.navigate("Date")} />
    </View>
  );
  const windowHeight = Dimensions.get("window").height;

  return (
    <KeyboardAvoidingView
      behavior="position"
      //   keyboardVerticalOffset={5}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
          {/* Chart depend of windowHeight */}
          {windowHeight > 800 ? chart : null}

          {/* Kiedy View */}
          <SeparatorText style={styles.textSeparator}>Kiedy?</SeparatorText>
          <DatePicker date={date} onChange={onChangeDate} />

          {/* Gdzie View */}
          <SeparatorText style={styles.textSeparator}>Gdzie?</SeparatorText>
          <View style={styles.selectPlace}>
            <View style={styles.place}>
              <Text style={{ textAlign: "center" }}>Wybierz z listy</Text>
              <View style={styles.placeList}>
                <PlaceList
                  data={workingPlaceList}
                  getPlaceInfo={getPlaceInfo}
                />
              </View>
            </View>
            <View style={styles.selectedPlace}>
              <Text>Wybrano</Text>
              <Input
                placeholder={"Miejsce"}
                value={place}
                keyboardType={"default"}
                onChangeText={setPlace}
                style={styles.inputPlace}
              />
            </View>
          </View>
          {/* Kategorie View */}
          <SeparatorText style={styles.textSeparator}>
            W jakiej kategorii?
          </SeparatorText>
          <View>
            <CategoryList />
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
              onPress={() =>
                console.log(saveItem(date, place, "owoce", itemName, cost))
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddSingleItemScreen;

const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },

  placeList: {
    height: 70,
    backgroundColor: "rgb(227, 227, 228)",
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
  },
  textSeparator: {
    color: Colors.primary,
    fontSize: 30,
    textAlign: "center",
  },
  selectedPlace: {
    alignItems: "center",
    width: "40%",
  },
  inputs: {
    alignItems: "center",
  },

  selectPlace: {
    flexDirection: "row",
  },
  place: {
    height: 90,
    width: "50%",
    marginLeft: 10,
  },
  input: {
    height: 25,
    width: 200,
    borderBottomWidth: 1,
    margin: 5,
    margin: 10,
    borderColor: Colors.accent,
  },
  inputPlace: {
    color: Colors.accent,
    paddingTop: 25,
    color: Colors.accent,
    fontSize: 18,
    fontWeight: "bold",
  },
});
