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
import ExpenseSearch from "../expenseFilter/ExpenseSearch";
const ExpenseHeader = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModalSearch, setToggleModalSearch] = useState(false);

  const modalHandler = (state) => {
    setToggleModal(state);
  };
  const modalHandlerSearch = (state) => {
    setToggleModalSearch(state);
  };
  return (
    <View
      style={{
        ...styles.expenseHeader,
        ...{ backgroundColor: Colors[scheme].backGroundOne },
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={toggleModal}
        onDismiss={setToggleModal}
      >
        <ExpenseHeaderModalFilter modalHandler={modalHandler} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={toggleModalSearch}
        onDismiss={setToggleModalSearch}
      >
        <ExpenseSearch modalHandlerSearch={modalHandlerSearch} />
      </Modal>
      <View style={{ ...styles.cost, ...{} }}>
        <Text
          style={{
            ...styles.costText,
            ...{ color: Colors[scheme].headerTintColor },
          }}
        >
          {props.cost.toFixed(2)}zł
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => setToggleModalSearch(true)}
          style={{
            ...styles.filterButton,
            ...{ backgroundColor: Colors[scheme].primary },
          }}
        >
          <MaterialIcons
            name="search"
            size={30}
            color={Colors[scheme].button}
          />
        </TouchableOpacity>
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
    // marginVertical: 10,
    height: 80,
    flexDirection: "row",
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    shadowColor: "black",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    paddingBottom: 5,
    marginBottom: 5,
  },
  cost: {
    marginLeft: 50,
  },
  filterButton: { borderRadius: 3, padding: 10, marginRight: 10 },
  costText: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 25,
    textAlign: "center",
    // marginLeft: 30,
  },
});
