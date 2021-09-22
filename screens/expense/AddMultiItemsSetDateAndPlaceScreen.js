import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import DatePicker from "../../components/DatePicker";
import PlaceList from "../../components/place/PlaceList";
import Colors from "../../constants/Colors";
import Receipt from "../../components/newMultiItems/receipt/Receipt";
import MultiItem from "../../models/MultiItem";
import uuid from "react-native-uuid";
import switchComaToDot from "../../functions/switchCompaToDot";
import * as itemsAction from "../../store/actions/items";
import { useDispatch, useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";

const AddMultiItemsScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const selectedPlace = useSelector((state) => state.favoritePlace.selected);
  const favList = useSelector((state) => state.favoritePlace.favoritePlace);
  const itemsFromRedux = useSelector((state) => state.item.items);
  const filteredFavList = favList.filter(
    (el) => el.name !== "Dodaj" && el.logo !== ""
  );

  const dispatch = useDispatch();
  const favListNames = filteredFavList.map((el) => el.name);
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState(selectedPlace);
  const [cost, setCost] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    dispatch(itemsAction.setReceiptDate(currentDate));
  };

  useEffect(() => {
    dispatch(itemsAction.setReceiptDate(date));
  }, [date]);

  const placeList = itemsFromRedux.map((el) => el.place);
  const newList = (placeList) =>
    placeList.filter((a, b) => placeList.indexOf(a) === b);
  const workingPlaceList = newList(placeList);

  const clearState = () => {
    setMainCategory("");
    setSubCategory("");
    setCost("");
  };

  const getPlaceInfo = (data) => {
    setPlace(data);
    dispatch(itemsAction.setReceiptPlace(data));
  };

  const addIntoTheReceipt = () => {
    const itemObj = new MultiItem(
      uuid.v4(),
      mainCategory,
      subCategory,
      Number(switchComaToDot(cost))
    );
    dispatch(itemsAction.addItemToTheReceipt(itemObj));
    clearState();
  };

  return (
    <KeyboardAvoidingView>
      <View
        style={{
          ...styles.screen,
          ...{ backgroundColor: Colors[scheme].light },
        }}
      >
        <ExternalComponent>
          <View style={styles.place}>
            <View
              style={{
                ...styles.placeList,
                ...{ backgroundColor: Colors[scheme].light },
              }}
            >
              <PlaceList
                favData={favListNames}
                data={workingPlaceList}
                getPlaceInfo={getPlaceInfo}
                place={place}
                imageUrl={filteredFavList}
              />
            </View>
          </View>
          <View
            style={{
              ...styles.datePicker,
              ...{ backgroundColor: Colors[scheme].light },
            }}
          >
            <DatePicker
              date={date}
              onChange={onChangeDate}
              maxDate={new Date()}
            />
          </View>
          <View
            style={{
              ...styles.receipt,
              ...{ backgroundColor: Colors[scheme].light },
            }}
          >
            <Receipt
              place={place}
              date={date.toISOString().slice(0, 10)}
              setPlace={getPlaceInfo}
              cost={cost}
              onSetCost={setCost}
              setMainCategory={setMainCategory}
              mainCategory={mainCategory}
              setSubCategory={setSubCategory}
              subCategory={subCategory}
              addItemToTheRecipt={() => addIntoTheReceipt()}
              backToHome={() => props.navigation.navigate("Home")}
            />
          </View>
        </ExternalComponent>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    width: "100%",
  },
  datePicker: {
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    // marginVertical: 10,
    paddingVertical: 10,
    width: Dimensions.get("window").width,
    // borderBottomWidth: 1,
  },
  placeList: {
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width,
    // borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // shadowOffset: { height: 0, width: 0 },
    // shadowRadius: 7,
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // borderBottomWidth: 1,
  },

  receipt: {
    height: Dimensions.get("window").height * 0.6,
    paddingBottom: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  place: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default AddMultiItemsScreen;
