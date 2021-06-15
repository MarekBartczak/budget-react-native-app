import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import Input from "../../components/newItems/Input";

const Receipt = (props) => {
  const [modal, showModal] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={30}
      style={styles.receipt}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                onRequestClose={() => showModal(!modal)}
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
});
