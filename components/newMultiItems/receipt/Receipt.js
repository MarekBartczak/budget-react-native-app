import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
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
import ListElement from "../ListElement";
import { useSelector, useDispatch } from "react-redux";
import * as itemsAction from "../../../store/actions/items";
import SaveItemsToTheStore from "../../../functions/SaveItemsToTheStore";
import numberInputValidation from "../../../functions/NumberInputValidation";
import saveDataToTheCloud from "../../../functions/cloud/saveDataToTheCloud";

const heightWindow = Dimensions.get("window").height;

const Receipt = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const navigation = useNavigation();
  const [modal, showModal] = useState(false);
  const receiptDate = useSelector((state) => state.item.receipt.date);
  const GetSelectedPlace = useSelector((state) => state.item.receipt.place);
  const showReceipt = useSelector((state) => state.item.receipt);
  const receiptItem = useSelector((state) => state.item.receipt.items);
  const userId = useSelector((state) => state.auth.userID);

  const dispatch = useDispatch();

  const sumOf = (total, sum) => total + sum;
  let costList = [];
  let sum = 0;
  if (receiptItem.length > 0) {
    costList = receiptItem.map((item) => item.cost * item.multiply);
    sum = costList.reduce(sumOf);
  }

  numberInputValidation(props.cost);
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={30}
      style={{
        ...styles.receipt,
        ...{ borderColor: Colors[scheme].primaryThird },
      }}
    >
      <View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <View>
              <View
                style={{
                  ...styles.place,
                  ...{ backgroundColor: Colors[scheme].primaryThird },
                }}
              >
                <Text
                  style={{
                    ...styles.placeText,
                    ...{ color: Colors[scheme].primarySecond },
                  }}
                >
                  {props.place ? props.place : "Wybierz sklep"}
                </Text>

                <View
                  style={{
                    ...styles.editBtn,
                    ...{ backgroundColor: Colors[scheme].primary },
                  }}
                >
                  <TouchableOpacity onPress={() => showModal(true)}>
                    <Feather
                      name="edit"
                      size={15}
                      color={Colors[scheme].button}
                    />
                  </TouchableOpacity>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => showModal(false)}
                  >
                    <View
                      style={{
                        ...styles.modalView,
                        ...{ backgroundColor: Colors[scheme].backGround },
                      }}
                    >
                      <TouchableOpacity onPress={() => showModal(!modal)}>
                        <View
                          style={{
                            width: Dimensions.get("window").width / 2,
                            borderColor: Colors[scheme].primaryThird,
                            borderWidth: 1,
                            padding: 10,
                            paddingHorizontal: 30,
                            borderRadius: 3,
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ color: Colors[scheme].button }}>
                            Zamknij
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          marginTop: 100,

                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Input
                          style={{
                            ...styles.inputModal,
                            ...{
                              color: Colors[scheme].primarySecond,
                              borderColor: Colors[scheme].primaryThird,
                            },
                          }}
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
                              color={Colors[scheme].button}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>

              <View style={styles.date}>
                <Text
                  style={{
                    ...styles.dateText,
                    ...{ color: Colors[scheme].primarySecond },
                  }}
                >
                  {props.date}
                </Text>
              </View>

              <View style={styles.list}>
                <FlatList
                  data={receiptItem}
                  keyExtractor={(item, index) => "item" + index}
                  renderItem={(item) => (
                    <ListElement
                      cost={item.item.cost.toFixed(2)}
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
                <View
                  style={{
                    ...styles.sumView,
                    ...{ backgroundColor: Colors[scheme].primaryThird },
                  }}
                >
                  <Text style={{ color: Colors[scheme].primarySecond }}>
                    Razem {sum.toFixed(2)}zł
                  </Text>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={{
                      ...styles.saveBtn,
                      ...{ backgroundColor: Colors[scheme].primaryThird },
                    }}
                    onPress={() => {
                      if (receiptItem.length > 0) {
                        let currentDate = receiptDate;
                        dispatch(itemsAction.setReceiptDate(currentDate));
                        let itemToSaved;
                        itemToSaved = SaveItemsToTheStore(showReceipt);
                        dispatch(itemsAction.addItemsFromReceipt(itemToSaved));
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
                      color={Colors[scheme].button}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      ...styles.addBtn,
                      ...{ backgroundColor: Colors[scheme].primaryThird },
                    }}
                    onPress={() => {
                      if (GetSelectedPlace.length > 0) {
                        navigation.navigate("AddToReceipt");
                      } else {
                        alert("Wybierz Sklep");
                      }
                    }}
                  >
                    <MaterialIcons
                      name="playlist-add"
                      size={24}
                      color={Colors[scheme].button}
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
    width: "100%",
    height: "100%",
    borderRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  modalView: {
    height: Dimensions.get("window").height,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  editBtn: {
    padding: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // shadowRadius: 7,
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
  },
  place: {
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  placeText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  date: {
    alignItems: "center",
    marginTop: 10,
  },
  dateText: {
    fontWeight: "bold",
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
    padding: 5,
    borderRadius: 1,
    width: Dimensions.get("window").width * 0.2,
    alignItems: "center",
  },
  saveBtn: {
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 7,
    padding: 5,
    borderRadius: 1,
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
    padding: 5,
    alignItems: "flex-end",
    marginVertical: 5,
  },
});
