import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../../../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as itemActions from "../../../../../store/actions/items";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { dataLang, selectLang } from "../../../../../lang/lang";

const SubCategoryElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
  const dispatch = useDispatch();
  const selectedSubCategory = useSelector((state) => state.item.category.sub);
  return (
    <TouchableOpacity
      onPress={() => dispatch(itemActions.selectSubCategory(props.item))}
    >
      <View>
        <View
          style={{
            ...styles.subCategoryElement,
            ...{ backgroundColor: Colors[scheme].primary },
          }}
        >
          <AntDesign
            name="doubleright"
            size={24}
            color={
              selectedSubCategory === props.item
                ? Colors[scheme].button
                : Colors[scheme].primaryThird
            }
          />

          <Text
            style={
              selectedSubCategory === props.item
                ? {
                    ...styles.subCategoryText,
                    ...{ color: Colors[scheme].button },
                  }
                : {
                    ...styles.subCategoryText,
                    ...{ color: Colors[scheme].primarySecond },
                  }
            }
          >
            {translate(props.item).toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SubCategoryElement;

const styles = StyleSheet.create({
  subCategoryText: {
    fontFamily: "Kanit_400Regular",
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,

    color: Colors.light.primarySecond,
  },
  subCategoryElement: {
    margin: 5,
    padding: 5,
    backgroundColor: Colors.light.primaryThird,
    borderTopLeftRadius: 10,
    flexDirection: "row",
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 7,
  },
});
