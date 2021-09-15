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
      <View style={{ ...styles.cost, ...{} }}>
        <Text
          style={{
            ...styles.costText,
            ...{ color: Colors[scheme].primarySecond },
          }}
        >
          {props.cost.toFixed(2)}zł
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
  cost: {
    width: Dimensions.get("window").width * 0.8,
  },
  filterButton: { borderRadius: 3, padding: 10, marginRight: 10 },
  costText: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 25,
    textAlign: "center",
    // marginLeft: 30,
  },
});
