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
import summaryCostCounter from "../../functions/summaryCostCounter";
import * as summmaryActions from "../../store/actions/summary";
import uuid from "react-native-uuid";

const SumaryCost = (props) => {
  const dispatch = useDispatch();
  const scheme = useSelector((state) => state.config.scheme);
  const date = new Date();
  const currentMonthNumber = date.getMonth();
  const currentYear = date.getFullYear();
  const filteredDate = useSelector((state) => state.summary);
  const [monthNr, setMonthNr] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState(currentYear);
  const [showModal, setShowModal] = useState(false);
  const [dateListWithObj, setDateListWithObj] = useState([]);
  const getType = props.type;
  const itemsList = props.list;
  let amount = 0;

  console.log(itemsList);

  let filteredByDate;
  filteredByDate = itemsList.filter((el) =>
    el.date.includes(`${year}-${monthNr}`)
  );

  if (filteredDate[getType] !== "") {
    console.log(filteredDate[getType]);
    filteredByDate = itemsList.filter((el) =>
      el.date.includes(filteredDate[getType])
    );
  }

  amount = summaryCostCounter(filteredByDate);

  const setDateIntoTheStore = () => {
    const dateList = [
      ...new Set(itemsList.map((el) => el.date.slice(0, 7))),
    ].sort();

    const createListForModal = (dateList) => {
      return dateList.map((el) => {
        const year = el.slice(0, 4);
        const month = el.slice(5, 7);

        return {
          named: `${year} - ${months[month - 1]}`,
          date: el,
        };
      });
    };
    switch (getType) {
      case "expense":
        setMonthName(dateList);
        setDateListWithObj(createListForModal(dateList));

        return;
      case "income":
        setMonthName(dateList);
        setDateListWithObj(createListForModal(dateList));
        return;
      case "fixedExpense":
        setMonthName(dateList);
        setDateListWithObj(createListForModal(dateList));
        return;
    }
  };

  const setFilterDate = (item) => {
    setYear(item.date.slice(0, 4));
    setMonth(months[Number(item.date.slice(5.7)) - 1]);
    switch (getType) {
      case "expense":
        dispatch(summmaryActions.setExpense(item.date));
        return;
      case "income":
        dispatch(summmaryActions.setIncome(item.date));
        return;
      case "fixedExpense":
        dispatch(summmaryActions.setFixedExpense(item.date));
        return;
    }
  };

  const setMonthName = (list) => {
    const yearFilter = () => {
      const yearList = list.map((el) => Number(el.slice(0, 4)));
      const maxYear = Math.max(...yearList);
      if (maxYear > 0) {
        setYear(maxYear);
        monthYear(maxYear, list);
      }
    };

    const monthYear = (maxYear, list) => {
      const filterByMaxYear = list.filter((el) => el.includes(maxYear));
      const monthList = filterByMaxYear.map((el) => Number(el.slice(5, 7)));
      const maxMonth = Math.max(...monthList);
      setMonth(months[maxMonth - 1]);

      if (maxMonth < 10) {
        setMonthNr(`0${maxMonth}`);
      } else {
        setMonthNr(maxMonth);
      }
    };
    yearFilter();
  };

  const prepareElements = () => {
    setDateIntoTheStore(getType);
  };

  useEffect(() => {
    prepareElements();
  }, [props.list]);

  const openModalWithDates = () => {
    return (
      <View>
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <View
            style={{
              marginTop: Dimensions.get("window").height * 0.75,
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
                backgroundColor: Colors[scheme].backGroundOne,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 0,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
              }}
            >
              <Text
                style={{
                  color: Colors[scheme].button,
                  fontFamily: "Kanit_600SemiBold",
                  backgroundColor: Colors[scheme].light,
                  borderRadius: 10,
                  overflow: "hidden",
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                }}
              >
                ZAMKNIJ
              </Text>
            </TouchableOpacity>
            <FlatList
              data={dateListWithObj}
              keyExtractor={(item) => item + "_" + uuid.v4()}
              renderItem={(item) => (
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(false);
                    setFilterDate(item.item);
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
                    {item.item.named}
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
    <View
      style={{
        ...styles.summaryCost,
        ...{ backgroundColor: Colors[scheme].backGroundOne },
      }}
    >
      <View>
        <Text
          style={{
            ...styles.textCost,
            ...{ color: Colors[scheme].headerTintColor },
          }}
        >
          {amount}zł
        </Text>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Text
            style={{
              ...styles.textDate,
              ...{
                backgroundColor: Colors[scheme].headerTintColor,
                color: Colors[scheme].backGroundOne,
              },
            }}
          >
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
  summaryCost: {
    width: Dimensions.get("window").width,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  textCost: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Kanit_600SemiBold",
  },

  textDate: {
    marginTop: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,

    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Kanit_600SemiBold",
  },
});
