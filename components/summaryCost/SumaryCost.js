import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import months from "../../data/months";
import * as itemsActions from "../../store/actions/items";

const SumaryCost = (props) => {
  const dispatch = useDispatch();
  const scheme = useSelector((state) => state.config.scheme);
  const date = new Date();
  const currentMonthNumber = date.getMonth();
  const currentYear = date.getFullYear();
  const selectedDate = useSelector((state) => state.item.view);
  const [month, setMonth] = useState();
  const [year, setYear] = useState(currentYear);
  const [showModal, setShowModal] = useState(false);

  const dateList = [...new Set(props.dateList.map((el) => el.date.slice(0, 7)))]
    .sort()
    .map((el) => el + "-01");

  const dateListWithObj = dateList
    .map((el) => {
      return {
        year: el.slice(0, 4),
        monthNumber: el.slice(5, 7),
        monthName: months[Number(el.slice(5, 7) - 1)],
      };
    })
    .sort();

  useEffect(() => {
    if (selectedDate.year === "" && selectedDate.month === "") {
      setMonth(months[currentMonthNumber]);
      setYear(currentYear);
    } else {
      setMonth(months[Number(selectedDate.month - 1)]);
      setYear(selectedDate.year);
    }
  });

  const openModalWithDates = () => {
    return (
      <View>
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <View
            style={{
              marginTop: Dimensions.get("window").height / 2,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height - 140,
              backgroundColor: Colors[scheme].backGround,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                marginTop: -30,
                height: 50,
                backgroundColor: Colors[scheme].primary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <Text
                style={{
                  color: Colors[scheme].primarySecond,
                  fontWeight: "bold",
                  fontFamily: "Kanit_600SemiBold",
                }}
              >
                ZAMKNIJ
              </Text>
            </TouchableOpacity>
            <FlatList
              data={dateListWithObj}
              keyExtractor={(item) => item.year + item.monthNumber}
              renderItem={(item) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      itemsActions.setFilteredMonth(
                        item.item.monthNumber,
                        item.item.year
                      )
                    );
                    setShowModal(false);
                  }}
                  style={{
                    width: Dimensions.get("window").width,
                    backgroundColor: Colors[scheme].backGround,
                    borderBottomColor: Colors[scheme].primary,
                    borderBottomWidth: 1,
                    // shadowOffset: { height: 0, width: 0 },
                    // shadowRadius: 7,
                    // shadowColor: "black",
                    // shadowOpacity: 0.5,
                    padding: 10,
                    paddingTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: Colors[scheme].primarySecond,
                      marginLeft: 20,
                    }}
                  >
                    {item.item.year} - {item.item.monthName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles[`summaryCost_${scheme}`]}>
      <View>
        <Text style={styles[`textCost_${scheme}`]}>{props.cost}zł</Text>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Text style={styles[`textDate_${scheme}`]}>
            {year} {month}
          </Text>
        </TouchableOpacity>
      </View>
      {openModalWithDates()}
    </View>
  );
};

export default SumaryCost;

const styles = StyleSheet.create({
  summaryCost_light: {
    marginTop: 10,
    // backgroundColor: Colors.light.primary,
    borderBottomColor: Colors.light.primary,
    width: Dimensions.get("window").width,
    height: 50,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryCost_dark: {
    marginTop: 10,

    // backgroundColor: Colors.dark.primary,
    borderBottomColor: Colors.dark.primary,
    borderBottomWidth: 1,

    width: Dimensions.get("window").width,
    height: 50,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  textCost_light: {
    color: Colors.light.primarySecond,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Kanit_600SemiBold",
  },
  textCost_dark: {
    color: Colors.dark.primarySecond,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Kanit_600SemiBold",
  },
  textDate_light: {
    marginBottom: 10,
    color: Colors.light.button,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Kanit_600SemiBold",
  },
  textDate_dark: {
    marginBottom: 10,
    color: Colors.dark.button,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Kanit_600SemiBold",
  },
});
