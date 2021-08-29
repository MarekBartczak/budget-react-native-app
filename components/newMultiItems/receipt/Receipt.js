import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  Button,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import Colors from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import Input from "../../input/Input";
import { MaterialIcons } from "@expo/vector-icons";

import NewElement from "../NewElement";
import ListElement from "../ListElement";
import { useSelector, useDispatch } from "react-redux";
import * as itemsAction from "../../../store/actions/items";
import SaveItemsToTheStore from "../../../functions/SaveItemsToTheStore";
import numberInputValidation from "../../../functions/NumberInputValidation";
import saveDataToTheCloud from "../../../functions/cloud/saveDataToTheCloud";
import NewElements from "../receipt/NewElement/NewElements";
const heightWindow = Dimensions.get("window").height;
const Receipt = (props) => {
  const navigation = useNavigation();
  const [modal, showModal] = useState(false);
  const [addItemModal, showAddItemModal] = useState(false);
  const receiptDate = useSelector((state) => state.item.receipt.date);
  const GetSelectedPlace = useSelector((state) => state.item.receipt.place);
  const showReceipt = useSelector((state) => state.item.receipt);
  const receiptItem = useSelector((state) => state.item.receipt.items);
  const allElements = useSelector((state) => state.item.items);
  const userId = useSelector((state) => state.auth.userID);

  const dispatch = useDispatch();

  const sumOf = (total, sum) => total + sum;
  let costList = [];
  let sum = 0;
  if (receiptItem.length > 0) {
    costList = receiptItem.map((item) => item.cost);
    sum = costList.reduce(sumOf);
  }

  numberInputValidation(props.cost);
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={30}
      style={styles.receipt}
    >
      <View style={styles.inner}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <View>
              <View style={styles.place}>
                <Text style={styles.placeText}>
                  {props.place ? props.place : "Wybierz sklep"}
                </Text>

                <View style={styles.editBtn}>
                  <TouchableOpacity onPress={() => showModal(true)}>
                    <Feather
                      name="edit"
                      size={15}
                      color={Colors.defaultThemeLight.white}
                    />
                  </TouchableOpacity>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => showModal(false)}
                  >
                    <View style={styles.modalView}>
                      <Input
                        style={styles.inputModal}
                        value={props.place}
                        placeholder="wpisz nowe miejsce"
                        keyboardType={"default"}
                        onChangeText={props.setPlace}
                      />
                      <View>
                        <TouchableOpacity onPress={() => showModal(!modal)}>
                          <Feather
                            name="save"
                            size={25}
                            color={Colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>

              <View style={styles.date}>
                <Text style={styles.dateText}>{props.date}</Text>
              </View>

              <View style={styles.list}>
                <FlatList
                  data={receiptItem}
                  keyExtractor={(item, index) => "item" + index}
                  renderItem={(item) => (
                    <ListElement
                      cost={item.item.cost}
                      itemName={item.item.name}
                      category={item.item.category}
                      multiply={item.item.multiply}
                    />
                  )}
                />
              </View>
            </View>
            <View style={styles.addBtnView}>
              <View style={styles.bottomPartOfRecipt}>
                <View style={styles.sumView}>
                  <Text style={styles.sum}>Razem {sum.toFixed(2)}zł</Text>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => {
                      if (receiptItem.length > 0) {
                        let currentDate = receiptDate;
                        dispatch(itemsAction.setReceiptDate(currentDate));
                        let itemToSaved;
                        itemToSaved = SaveItemsToTheStore(showReceipt);
                        dispatch(itemsAction.addItemsFromReceipt(itemToSaved));
                        // console.log(itemToSaved);
                        saveDataToTheCloud.expense(itemToSaved, userId);
                        props.backToHome();
                      } else {
                        alert("Dodaj pozycje do paragonu");
                      }
                    }}
                  >
                    <Feather
                      name="save"
                      size={24}
                      color={Colors.defaultThemeLight.white}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => {
                      if (GetSelectedPlace.length > 0) {
                        // showAddItemModal(!addItemModal);
                        navigation.navigate("AddToReceipt");

                        // props.navigation.goBack();

                        // console.log("test");
                      } else {
                        alert("Wybierz Sklep");
                      }
                    }}
                  >
                    <MaterialIcons
                      name="playlist-add"
                      size={24}
                      color={Colors.defaultThemeLight.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  receipt: {
    width: "90%",
    height: "100%",
    backgroundColor: Colors.defaultThemeLight.white,
    borderRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  // inner: {
  //   backgroundColor: Colors.accent,
  //   borderRadius: 7,
  //   height: "96%",
  //   width: "96%",
  //   borderWidth: 3,
  //   borderColor: Colors.gradientBackground.primary,
  //   margin: "2%",
  // },
  modalView: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255,0.9)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addItemModalView: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255,0.9)",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 40,
  },
  editBtn: {
    backgroundColor: Colors.defaultThemeLight.buttton,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 7,
    marginLeft: 10,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  placeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.defaultThemeLight.primaryDark,
  },
  date: {
    alignItems: "center",
    marginTop: 10,
  },
  dateText: {
    fontWeight: "bold",
    color: Colors.defaultThemeLight.primaryDark,
  },
  addBtnView: {
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: "flex-end",
  },
  addBtn: {
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 7,
    backgroundColor: Colors.defaultThemeLight.buttton,
    padding: 5,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.2,
    alignItems: "center",
  },
  saveBtn: {
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 7,
    backgroundColor: Colors.defaultThemeLight.buttton,
    padding: 5,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.2,
    alignItems: "center",
  },
  list: {
    marginTop: 5,
    height: heightWindow < 900 ? heightWindow / 5 : heightWindow / 4,
    width: "100%",
    flexDirection: "column",
  },
  bottomPartOfRecipt: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sumView: {
    backgroundColor: Colors.banner,
    padding: 5,
    alignItems: "flex-end",
    marginVertical: 5,
  },
});
