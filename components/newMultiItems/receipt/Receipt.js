import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
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
import fontScale from "../../../constants/FontScale";
import { dataLang, selectLang } from "../../../lang/lang";
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
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
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
      style={{
        ...styles.receipt,
        ...{ backgroundColor: Colors[scheme].light },
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
                  ...{ backgroundColor: Colors[scheme].primary },
                }}
              >
                <Text
                  style={{
                    ...styles.placeText,
                    ...{ color: Colors[scheme].primarySecond },
                  }}
                >
                  {props.place ? props.place : translate("Wybierz sklep")}
                </Text>

                <View
                  style={{
                    ...styles.editBtn,
                    ...{ backgroundColor: Colors[scheme].primary },
                  }}
                >
                  <TouchableOpacity onPress={() => showModal(!modal)}>
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
                      <TouchableOpacity
                        onPress={() => {
                          showModal(false);
                        }}
                        style={{
                          width: Dimensions.get("window").width / 2,
                          borderColor: Colors[scheme].primaryThird,
                          borderWidth: 1,
                          padding: 10,
                          paddingHorizontal: 30,
                          borderRadius: 10,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors[scheme].button,
                            fontFamily: "Kanit_600SemiBold",
                          }}
                        >
                          {translate("Zamknij").toUpperCase()}
                        </Text>
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
                          placeholder={translate("wpisz nowe miejsce")}
                          keyboardType={"default"}
                          onChangeText={props.setPlace}
                        />
                        <View>
                          <TouchableOpacity onPress={() => showModal(false)}>
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
                      mainCategory={item.item.mainCategory}
                      subCategory={item.item.subCategory}
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
                  <Text
                    style={{
                      color: Colors[scheme].primarySecond,
                      fontFamily: "Kanit_400Regular",
                      fontSize: fontScale(7),
                    }}
                  >
                    {translate("Razem")} {sum.toFixed(2)} PLN
                  </Text>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={{
                      ...styles.saveBtn,
                      ...{ backgroundColor: Colors[scheme].primary },
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
                        alert(translate("Dodaj pozycje do paragonu"));
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
                      ...{ backgroundColor: Colors[scheme].primary },
                    }}
                    onPress={() => {
                      if (GetSelectedPlace.length > 0) {
                        navigation.navigate("AddToReceipt");
                      } else {
                        alert(translate("Wybierz Sklep"));
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
    width: "90%",
    height: "100%",
    borderRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 7,
  },
  modalView: {
    height: Dimensions.get("window").height,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  editBtn: {
    padding: 5,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    // // shadowOffset: { height: 0, width: 0 },
    // // shadowColor: "black",
    // // shadowOpacity: 0.5,
    // // shadowRadius: 7,
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
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
  },
  placeText: {
    fontSize: fontScale(15),
    fontFamily: "Kanit_600SemiBold",
  },
  date: {
    alignItems: "center",
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
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // shadowRadius: 7,
    padding: 5,
    borderRadius: 1,
    width: Dimensions.get("window").width * 0.2,
    alignItems: "center",
  },
  saveBtn: {
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // shadowRadius: 7,
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
