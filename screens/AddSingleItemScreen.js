import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Chart from "../components/Chart";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../constants/Colors";
import Items from "../data/Dummy-data";
import ItemListToAdd from "../components/itemListToAdd";

const AddSingleItemScreen = (props) => {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const placeList = Items.map((el) => el.place);
  const newList = (placeList) =>
    placeList.filter((a, b) => placeList.indexOf(a) === b);

  const workingPlaceList = newList(placeList);
  //   console.log(workingPlaceList);
  const getPlaceInfo = (data) => {
    setPlace(data);
  };
  return (
    <View>
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={30}
          style={styles.container}
          enabled
        >
          <View style={styles.screen}>
            <View>
              <Chart press={() => props.navigation.navigate("Date")} />
            </View>
            <Text style={styles.textSeparator}>Kiedy?</Text>
            <View style={styles.pickADate}>
              <View style={styles.pickADate}>
                <RNDateTimePicker
                  maximumDate={new Date()}
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  display="spinner"
                  textColor={Colors.primary}
                  onChange={onChange}
                />
              </View>
              <View>
                <Text style={styles.textSeparator}>Gdzie?</Text>
                <View style={styles.selectPlace}>
                  <View style={styles.place}>
                    <Text style={{ textAlign: "center" }}>Wybierz z listy</Text>
                    <View>
                      <FlatList
                        data={workingPlaceList}
                        keyExtractor={(item) => item}
                        renderItem={(list) => (
                          <ItemListToAdd
                            list={list.item}
                            setPlace={getPlaceInfo}
                          />
                        )}
                      />
                    </View>
                  </View>
                  <View style={styles.selectedPlace}>
                    <Text>Wybrano</Text>
                    <Text>{place}</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.textSeparator}>Co i za ile?</Text>
                <View>
                  <View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <TextInput
                        style={styles.input}
                        value={itemName}
                        placeholder="co?"
                        autoComplete="off"
                        autoCapitalize="none"
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onChangeText={setItemName}
                      />
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="za ile?"
                        onChangeText={setCost}
                        value={cost}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
              <View>
                <Button
                  title={"Dodaj"}
                  color={Colors.primary}
                  onPress={() => console.log(date, place, itemName, cost)}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default AddSingleItemScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  textSeparator: {
    color: Colors.primary,
    fontSize: 30,
    textAlign: "center",
  },
  pickADate: {
    width: "100%",
    backgroundColor: "rgb(242,242,242)",
  },
  selectPlace: {
    flexDirection: "row",
  },
  place: {
    height: 90,
    width: "50%",
    marginLeft: 10,
  },
  input: {
    height: 25,
    width: 150,
    borderBottomWidth: 1,
    margin: 5,
    borderColor: "black",
  },
});
