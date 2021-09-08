import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import NewElements from "../../components/newMultiItems/receipt/NewElement/NewElements";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const AddItemToTheReceiptScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

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
              backgroundColor: Colors[scheme].primaryThird,
              borderRadius: 1,
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
              color={Colors[scheme].button}
            />
            <Text
              style={{
                color: Colors[scheme].button,
                fontFamily: "Kanit_600SemiBold",
              }}
            >
              DALEJ
            </Text>
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
                backgroundColor: Colors[scheme].primaryThird,
                borderRadius: 1,
                // shadowOffset: { height: 0, width: 0 },
                // shadowColor: "black",
                // shadowOpacity: 0.5,
                // shadowRadius: 7,
              }}
            >
              <Ionicons
                name="arrow-forward-circle"
                size={34}
                color={Colors[scheme].backGroundOne}
              />

              <Text
                style={{
                  color: Colors[scheme].backGroundOne,
                  fontFamily: "Kanit_600SemiBold",
                }}
              >
                DALEJ
              </Text>
            </View>
          </View>
        )}
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
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").height * 0.25,
    marginLeft: Dimensions.get("window").width * 0.55,
  },
});
