import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Colors from "../../../../constants/Colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as raportActions from "../../../../store/actions/raport";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

const SelectEl = (props) => {
  const raportState = useSelector((state) => state.raport);
  const isSelected = raportState[props.el].isSelected;
  const dateList = raportState[props.el].dateList;
  const isDateSelected = dateList;
  const dispatch = useDispatch();
  const setTypeInStore = () => {
    dispatch(raportActions.isSelectedType(!isSelected, props.el));
    //if selected is false set all data as false also
  };

  const isDateSelectedToggle = (date, isSelected) => {
    dispatch(raportActions.isSelectedDate(date, props.el, isSelected));
  };

  const renderDateList = (item) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => isDateSelectedToggle(item.date, !item.isSelected)}
      >
        <View style={styles.el}>
          <Ionicons
            name={item.isSelected ? "radio-button-on" : "radio-button-off"}
            size={15}
            color="black"
          />
          <Text>{item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const showDatePicker = (isSelected) => {
    let list;
    if (isSelected) {
      list = props.dateList.dateList;
      return (
        <View>
          <FlatList
            style={styles.list}
            data={list[0]}
            renderItem={({ item }) => renderDateList(item)}
            keyExtractor={(key) => key.date.toString()}
          />
        </View>
      );
    }
    return;
  };

  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={() => setTypeInStore()}>
        <View style={styles.select}>
          <FontAwesome
            name={isSelected ? "angle-double-up" : "angle-double-down"}
            size={24}
            color="black"
          />
          <Text style={styles.textName}> {props.name}</Text>
        </View>
      </TouchableOpacity>
      {showDatePicker(isSelected)}
    </View>
  );
};

export default SelectEl;

const styles = StyleSheet.create({
  select: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: Colors.default,
  },
  el: {
    flexDirection: "row",
    alignItems: "center",
  },
  textName: {
    fontSize: 10,
  },
  textDate: {
    fontSize: 8,
  },
  item: {
    backgroundColor: Colors.banner,
    margin: 3,
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  list: {
    height: 50,
  },
  button: {},
});
