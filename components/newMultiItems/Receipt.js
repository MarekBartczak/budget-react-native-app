import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  Button,
} from "react-native";

import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import Input from "../../components/newItems/Input";
import { MaterialIcons } from "@expo/vector-icons";
import NewElement from "./NewElement";
import ListElement from "./ListElement";
import { useSelector } from "react-redux";

const Receipt = (props) => {
  const [modal, showModal] = useState(false);
  const [addItemModal, showAddItemModal] = useState(false);
  const reciptData = useSelector((state) => state.item.recipt);
  const sumOf = (total, sum) => total + sum;
  let costList = [];
  let sum = 0;
  if (reciptData.length > 0) {
    costList = reciptData.map((item) => item.cost);
    sum = costList.reduce(sumOf);
  }
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={30}
      style={styles.receipt}
    >
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
                  <Feather name="edit" size={15} color="black" />
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
                        <Feather name="save" size={25} color={Colors.primary} />
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
                data={reciptData}
                keyExtractor={(item, index) => "item" + index}
                renderItem={(item) => (
                  <ListElement
                    cost={item.item.cost}
                    itemName={item.item.name}
                    category={item.item.category}
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.addBtnView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={addItemModal}
              onRequestClose={() => showAddItemModal(false)}
            >
              <View style={styles.addItemModalView}>
                <NewElement
                  itemName={props.itemName}
                  onSetName={props.onSetName}
                  cost={props.cost}
                  category={props.category}
                  onSetCost={props.onSetCost}
                  onChangeCategory={props.setCategory}
                />
                <View style={styles.buttons}>
                  <Button
                    title="Anuluj"
                    color="red"
                    onPress={() => {
                      showAddItemModal(!addItemModal);
                    }}
                  />
                  <Button
                    color={Colors.primary}
                    title="Dodaj"
                    onPress={() => {
                      props.addItemToTheRecipt();
                      showAddItemModal(!addItemModal);
                    }}
                  />
                </View>
              </View>
            </Modal>

            <View style={styles.bottomPartOfRecipt}>
              <View style={styles.sumView}>
                <Text style={styles.sum}>Razem {sum}zł</Text>
              </View>
              <View style={styles.buttons}>
                <View style={styles.saveBtn}>
                  <TouchableOpacity onPress={() => {}}>
                    <Feather name="save" size={44} color={Colors.accent} />
                  </TouchableOpacity>
                </View>
                <View style={styles.addBtn}>
                  <TouchableOpacity
                    onPress={() => showAddItemModal(!addItemModal)}
                  >
                    <MaterialIcons
                      name="playlist-add"
                      size={44}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  receipt: {
    width: "90%",
    height: "100%",
    backgroundColor: "rgba(210, 210, 210,1)",
    borderRadius: 10,
    shadowRadius: 10,
    shadowOffset: { height: 0, width: 10 },
    shadowColor: "black",
    shadowOpacity: 0.23,
  },
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
    // justifyContent: "center",
    paddingTop: 40,
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
    alignItems: "center",
    marginTop: 10,
  },
  placeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primary,
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
  addBtn: {},
  list: {
    height: 150,
    width: "100%",
    flexDirection: "column",
  },
  bottomPartOfRecipt: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  //   sum: {
  //     fontWeight: "bold",
  //   },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sumView: {
    backgroundColor: Colors.banner,
    padding: 5,
    alignItems: "flex-end",
  },
});
