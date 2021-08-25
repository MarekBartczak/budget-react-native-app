import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import NewElements from "../../components/newMultiItems/receipt/NewElement/NewElements";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const AddItemToTheReceiptScreen = (props) => {
  const selectedCategory = useSelector((state) => state.item.category.main);
  const selectedSubCategory = useSelector((state) => state.item.category.sub);

  const navigation = useNavigation();

  const addValidate = () => {
    if (selectedCategory != "" && selectedSubCategory != "") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <View style={styles.addItemModalView}>
      <NewElements />
      {/* <NewElement
            place={props.place}
            itemName={props.itemName}
            onSetName={props.onSetName}
            cost={props.cost}
            category={props.category}
            onSetCost={props.onSetCost}
            onChangeCategory={props.setCategory}
            multiply={props.multiply}
            onSetMultiply={props.setMultiply}
          /> */}
      <View style={styles.buttons}>
        <View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: Dimensions.get("window").width * 0.4,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons name="cancel" size={54} color="red" />
            <Text style={{ color: "red" }}>Anuluj</Text>
          </TouchableOpacity>
        </View>
        <View>
          {addValidate() ? (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: Dimensions.get("window").width * 0.4,
              }}
              onPress={() => {
                // props.addItemToTheRecipt();
              }}
            >
              <Ionicons name="arrow-forward-circle" size={54} color="green" />
              {/* <MaterialIcons name="add-box" size={54} color="green" /> */}
              <Text style={{ color: "green" }}>Dalej</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: Dimensions.get("window").width * 0.4,
                }}
              >
                <Ionicons
                  name="arrow-forward-circle"
                  size={54}
                  color={Colors.placeholder}
                />

                <Text style={{ color: Colors.placeholder }}>Dalej</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default AddItemToTheReceiptScreen;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    width: "100%",
    height: Dimensions.get("window").height * 0.25,
    justifyContent: "center",
  },
});
