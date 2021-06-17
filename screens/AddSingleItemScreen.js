import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
// import Items from "../data/Dummy-data";
import Item from "../models/Item";
import uuid from "react-native-uuid";
import DatePicker from "../components/DatePicker";
import PlaceList from "../components/newItems/PlaceList";
import Input from "../components/newItems/Input";
import SeparatorText from "../components/newItems/SeparatorText";
import switchComaToDot from "../functions/switchCompaToDot";
import CategoryList from "../components/newItems/CategoryList";
import { LinearGradient } from "expo-linear-gradient";
import * as itemsAction from "../store/actions/items";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const AddSingleItemScreen = (props) => {
  const itemsFromRedux = useSelector((state) => state.item.items);

  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [addNewPlace, setAddNewPlace] = useState(false);
  const [addNewCategory, setAddNewCategory] = useState(false);

  const dispatch = useDispatch();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const checkIfEmpty = (val) => {
    return val ? true : false;
  };
  const placeList = itemsFromRedux.map((el) => el.place);
  const newList = (placeList) =>
    placeList.filter((a, b) => placeList.indexOf(a) === b);

  const workingPlaceList = newList(placeList);
  const getPlaceInfo = (data) => {
    setPlace(data);
  };

  const saveItem = (date, place, category, name, cost) => {
    return new Item(
      uuid.v4(),
      date.toISOString().slice(0, 10),
      place,
      category,
      name,
      Number(switchComaToDot(cost))
    );
  };

  const setCategoryState = (data) => {
    setCategory(data);
  };

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
            <SeparatorText style={styles.textSeparator}>Kiedy?</SeparatorText>
            <View style={styles.datePicker}>
              <DatePicker date={date} onChange={onChangeDate} />
            </View>

            {/* Gdzie View */}
            <View style={styles.separatorView}>
              <SeparatorText style={styles.textSeparator}>Gdzie?</SeparatorText>
              <TouchableOpacity onPress={() => setAddNewPlace(true)}>
                <Feather name="edit" size={15} color="black" />
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={addNewPlace}
                onRequestClose={() => setAddNewPlace(!addNewPlace)}
              >
                <View style={styles.addNewPlaceView}>
                  <Input
                    style={styles.inputModal}
                    value={place}
                    placeholder="wpisz nowe miejsce"
                    keyboardType={"default"}
                    onChangeText={setPlace}
                  />

                  <TouchableOpacity onPress={() => setAddNewPlace(false)}>
                    <Feather name="save" size={25} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </Modal>
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
            {/* Kategorie View */}
            <View style={styles.separatorView}>
              <SeparatorText style={styles.textSeparator}>
                W jakiej kategorii?
              </SeparatorText>
              <TouchableOpacity onPress={() => setAddNewCategory(true)}>
                <Feather name="edit" size={15} color="black" />
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={addNewCategory}
                onRequestClose={() => setAddNewCategory(!addNewCategory)}
              >
                <View style={styles.addNewPlaceView}>
                  <Input
                    style={styles.inputModal}
                    value={category}
                    placeholder="wpisz nową Kategorie"
                    keyboardType={"default"}
                    onChangeText={setCategory}
                  />

                  <TouchableOpacity onPress={() => setAddNewCategory(false)}>
                    <Feather name="save" size={25} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
            <View>
              <CategoryList
                onChangeCategory={setCategoryState}
                category={category}
              />
            </View>

            <View style={styles.CardAndInpuView}>
              <View style={styles.inputArea}>
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
                <View style={styles.addBtn}>
                  <Button
                    title={"Dodaj"}
                    color={Colors.primary}
                    onPress={() => {
                      if (
                        checkIfEmpty(date) &&
                        checkIfEmpty(place) &&
                        checkIfEmpty(category) &&
                        checkIfEmpty(itemName) &&
                        checkIfEmpty(cost)
                      ) {
                        dispatch(
                          itemsAction.addItem(
                            saveItem(date, place, category, itemName, cost)
                          )
                        );
                        setDate(new Date());
                        setPlace("");
                        setCost("");
                        setItemName("");
                        setCategory("");
                        props.navigation.navigate("Home");
                      } else alert("uzupełnij wszystkie pola");
                    }}
                  />
                </View>
              </View>
              <View style={styles.miniCard}>
                <View style={styles.miniCardDate}>
                  <Text style={styles.miniCardDateText}>
                    {date.toISOString().slice(0, 10)}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "white",
                    height: 100,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <View style={styles.miniCardContentTop}>
                    <View style={styles.miniCardContentTopPlace}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                          textAlign: "left",
                          paddingLeft: 2,
                        }}
                      >
                        {place}
                      </Text>
                    </View>
                    <View style={styles.miniCardContentTopCategory}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                          textAlign: "right",
                          paddingRight: 2,
                        }}
                      >
                        {category}
                      </Text>
                    </View>
                    <View style={styles.miniCardContentName}>
                      <Text
                        style={{
                          paddingTop: 15,
                          fontSize: 11,
                          color: Colors.primary,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {itemName}
                      </Text>
                    </View>
                    <View style={styles.miniCardContentCost}>
                      <Text
                        style={{
                          paddingTop: 15,
                          fontSize: 11,
                          color: Colors.accent,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {cost} {cost ? "zł" : null}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
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
  addBtn: {
    width: 100,
  },
  inputArea: {
    alignItems: "center",
    // justifyContent: "center",
  },
  CardAndInpuView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
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
  addNewPlaceView: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255,0.9)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 10,
  },

  inputs: {
    alignItems: "center",
  },
  separatorView: {
    flexDirection: "row",
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
  inputModal: {
    height: 40,
    fontSize: 20,
    width: 200,
    borderBottomWidth: 3,
    fontWeight: "bold",
    margin: 5,
    margin: 10,
    color: Colors.primary,
    borderColor: Colors.primary,
  },

  category: {
    color: Colors.accent,
    fontSize: 18,
    fontWeight: "bold",
  },
  miniCard: {
    maxWidth: 120,

    paddingTop: 10,
    flexDirection: "column",
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { height: 10, width: 0 },
    shadowColor: Colors.primary,
    shadowRadius: 10,
  },
  miniCardDate: {
    backgroundColor: Colors.banner,
    width: 120,
    height: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  miniCardDateText: {
    color: Colors.primary,
    textAlign: "center",
  },
  miniCardContent: {
    maxWidth: 120,
  },

  miniCardContentTop: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
