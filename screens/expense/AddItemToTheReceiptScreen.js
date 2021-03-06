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
import { dataLang, selectLang } from "../../lang/lang";

const AddItemToTheReceiptScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };

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
              backgroundColor: Colors[scheme].primary,
              borderRadius: 1,
              shadowOffset: { height: 0, width: 0 },
              shadowColor: "black",
              shadowOpacity: 0.25,
              shadowRadius: 3,
              elevation: 7,
            }}
            onPress={() => {
              // props.addItemToTheRecipt();
              navigateToInputData();
            }}
          >
            <Text
              style={{
                color: Colors[scheme].button,
                fontFamily: "Kanit_600SemiBold",
              }}
            >
              {translate("DALEJ").toUpperCase()}
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
                backgroundColor: Colors[scheme].primary,
                borderRadius: 1,
                shadowOffset: { height: 0, width: 0 },
                shadowColor: "black",
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 7,
              }}
            >
              <Text
                style={{
                  color: Colors[scheme].primaryThird,
                  fontFamily: "Kanit_600SemiBold",
                }}
              >
                {translate("DALEJ").toUpperCase()}
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
