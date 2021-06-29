import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import Item from "../models/Item";
import uuid from "react-native-uuid";
import DatePicker from "../components/DatePicker";
import PlaceList from "../components/place/PlaceList";
import Input from "../components/newItems/Input";
import SeparatorText from "../components/newItems/SeparatorText";
import switchComaToDot from "../functions/switchCompaToDot";
import CategoryList from "../components/newItems/CategoryList";
import { LinearGradient } from "expo-linear-gradient";
import * as itemsAction from "../store/actions/items";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import MiniCard from "../components/newItems/MiniCard";

const AddSingleItemScreen = (props) => {
  const itemsFromRedux = useSelector((state) => state.item.items);
  const favList = useSelector((state) => state.favoritePlace.favoritePlace);

  const favListNames = favList.map((el) => el.name);
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

  const placeList = itemsFromRedux.map((el) => el.place);
  const newList = (placeList) =>
    placeList.filter((a, b) => placeList.indexOf(a) === b);
  const workingPlaceList = newList(placeList);

  const getPlaceInfo = (data) => {
    setPlace(data);
  };

  const checkIfEmpty = (val) => {
    return val ? true : false;
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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={"position"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={
          Dimensions.get("window").height < 670 ? 60 : -100
        }
        enabled
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <LinearGradient
            colors={[
              Colors.gradientBackground.primary,
              Colors.gradientBackground.secondary,
            ]}
            style={styles.background}
          >
            <View style={styles.screen}>
              <SeparatorText style={styles.textSeparator}>Kiedy?</SeparatorText>
              <View style={styles.datePicker}>
                <DatePicker date={date} onChange={onChangeDate} />
              </View>

              {/* Gdzie View */}
              <View style={styles.separatorView}>
                <SeparatorText style={styles.textSeparator}>
                  Gdzie?
                </SeparatorText>
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
                    favData={favListNames}
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
                      placeholder="wpisz nową kategorie"
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
                <MiniCard
                  date={date}
                  place={place}
                  category={category}
                  itemName={itemName}
                  cost={cost}
                />
              </View>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddSingleItemScreen;

const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },
  textSeparator: {
    color: "black",
    fontSize: 15,
    textAlign: "left",
    marginRight: 10,
    marginTop: 10,
  },
  datePicker: {
    alignItems: "center",
    justifyContent: "center",
  },
  separatorView: {
    flexDirection: "row",
    alignItems: "center",
  },
  addNewPlaceView: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255,0.9)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  place: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    shadowOffset: { height: 0, width: 10 },
    shadowColor: Colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    marginBottom: 40,
  },
  placeList: {
    marginTop: -20,
    flexDirection: "column",
    width: "90%",
    height: 70,
  },
  CardAndInpuView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputArea: {
    alignItems: "center",
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
  addBtn: {
    width: 100,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});
