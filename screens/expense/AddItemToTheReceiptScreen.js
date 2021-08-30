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
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as itemsActions from "../../store/actions/items";

const AddItemToTheReceiptScreen = (props) => {
  const selectedCategory = useSelector((state) => state.item.category.main);
  const selectedSubCategory = useSelector((state) => state.item.category.sub);
  const isCategorySelected = useSelector(
    (state) => state.item.category.selected
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const addValidate = () => {
    if (selectedCategory != "" && selectedSubCategory != "") {
      return true;
    } else {
      return false;
    }
  };
  const navigateToInputData = () => {
    navigation.navigate("InputData");
  };
  const nextButton = () => {
    return (
      <View style={styles.buttons}>
        {addValidate() ? (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: Dimensions.get("window").width * 0.3,
              paddingVertical: 10,
              marginRight: 20,
              backgroundColor: Colors.light.button,
              borderRadius: 10,
              shadowOffset: { height: 0, width: 0 },
              shadowColor: "black",
              shadowOpacity: 0.5,
              shadowRadius: 7,
            }}
            onPress={() => {
              // props.addItemToTheRecipt();
              navigateToInputData();
            }}
          >
            <Ionicons
              name="arrow-forward-circle"
              size={34}
              color={Colors.light.primaryThird}
            />
            <Text style={{ color: Colors.light.primaryThird }}>Dalej</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: Dimensions.get("window").width * 0.3,
                paddingVertical: 10,
                marginRight: 20,
                backgroundColor: Colors.light.primary,
                borderRadius: 10,
                // shadowOffset: { height: 0, width: 0 },
                // shadowColor: "black",
                // shadowOpacity: 0.5,
                // shadowRadius: 7,
              }}
            >
              <Ionicons
                name="arrow-forward-circle"
                size={34}
                color={Colors.placeholder}
              />

              <Text style={{ color: Colors.placeholder }}>Dalej</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const backButton = () => {
    return (
      <View style={styles.buttons}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get("window").width * 0.4,
          }}
          onPress={() => {
            // props.addItemToTheRecipt();
            dispatch(itemsActions.setSelectedCategory(false));
          }}
        >
          <Ionicons name="arrow-back-circle" size={4} color="red" />
          <Text style={{ color: "red" }}>cofnij</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.addItemModalView}>
      <NewElements />
      {nextButton()}
    </View>
  );
};

export default AddItemToTheReceiptScreen;

const styles = StyleSheet.create({
  buttons: {
    // flexDirection: "row",
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").height * 0.25,
    marginLeft: Dimensions.get("window").width * 0.55,
  },
});
