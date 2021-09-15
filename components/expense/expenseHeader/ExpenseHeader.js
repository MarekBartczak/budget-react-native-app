import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import ExpenseHeaderModalFilter from "./ExpenseHeaderModalFilter";

const ExpenseHeader = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
  const [toggleModal, setToggleModal] = useState(false);

  const modalHandler = (state) => {
    setToggleModal(state);
  };
  return (
    <View style={{ ...styles.expenseHeader, ...{} }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={toggleModal}
        onDismiss={setToggleModal}
      >
        <ExpenseHeaderModalFilter modalHandler={modalHandler} />
      </Modal>
      <View style={{ ...styles.date, ...{} }}>
        <Text
          style={{
            ...styles.dateText,
            ...{ color: Colors[scheme].primarySecond },
          }}
        >
          {date}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => setToggleModal(true)}
          style={{
            ...styles.filterButton,
            ...{ backgroundColor: Colors[scheme].primary },
          }}
        >
          <MaterialIcons
            name="filter-list"
            size={30}
            color={Colors[scheme].button}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExpenseHeader;

const styles = StyleSheet.create({
  expenseHeader: {
    marginVertical: 10,
    flexDirection: "row",
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    width: Dimensions.get("window").width * 0.8,
  },
  filterButton: { borderRadius: 3, padding: 10, marginRight: 10 },
  dateText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 25,
    marginLeft: 10,
  },
});
