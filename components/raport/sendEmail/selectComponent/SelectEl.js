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
import fontScale from "../../../../constants/FontScale";
import { dataLang, selectLang } from "../../../../lang/lang";

const SelectEl = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const raportState = useSelector((state) => state.raport);
  const isSelected = raportState[props.el].isSelected;
  const dateList = raportState[props.el].dateList;
  const isDateSelected = dateList;
  const dispatch = useDispatch();
  const setTypeInStore = () => {
    dispatch(raportActions.isSelectedType(!isSelected, props.el));
  };
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
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
        <View
          style={{
            ...styles.el,
            ...{ backgroundColor: Colors[scheme].primary },
          }}
        >
          <Ionicons
            name={item.isSelected ? "radio-button-on" : "radio-button-off"}
            size={fontScale(8)}
            color={Colors[scheme].button}
          />
          <Text
            style={{ color: Colors[scheme].button, fontSize: fontScale(8) }}
          >
            {item.date}
          </Text>
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
    } else {
      return null;
    }
  };

  return (
    <View style={styles.element}>
      <View>
        <View
          style={{
            ...styles.button,
            ...{},
          }}
        >
          <Text
            style={{
              ...styles.textName,
              ...{
                color: Colors[scheme].primary,
                fontFamily: "Kanit_600SemiBold",
                // textAlign: "center",
                fontSize: fontScale(6),
              },
            }}
          >
            {translate(props.name).toUpperCase()}
          </Text>
          <FontAwesome
            name={"angle-double-down"}
            size={24}
            color={Colors[scheme].primary}
          />
        </View>
      </View>
      {showDatePicker(true)}
    </View>
  );
};

export default SelectEl;

const styles = StyleSheet.create({
  element: {
    marginHorizontal: 10,
    height: 200,
  },
  select: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  el: {
    padding: 10,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  textName: {
    marginTop: 10,
    fontSize: fontScale(6),
  },
  textDate: {
    fontSize: fontScale(6),
  },
  item: {
    padding: 5,
    borderRadius: 10,
  },
  list: {
    maxHeight: 150,
  },
  button: {
    alignItems: "center",
    width: Dimensions.get("window").width / 4,
    height: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
