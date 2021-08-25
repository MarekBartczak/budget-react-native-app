import { StyleSheet, Text, View } from "react-native";
import CategoriesList from "../../../../../data/category";
import React from "react";
import Colors from "../../../../../constants/Colors";
import MainCategoryElement from "./MainCategoryElement";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Categories = (props) => {
  const categoriesListObjectKeys = Object.keys(CategoriesList);
  const mainCategoryList = categoriesListObjectKeys.map(
    (el) => CategoriesList[el].name
  );

  return (
    <View>
      <View style={styles.elements}>
        <View style={styles.categoryRow}>
          <MainCategoryElement
            title={mainCategoryList[0]}
            icon={
              <MaterialCommunityIcons
                name="food-variant"
                size={54}
                color={Colors.default}
              />
            }
          />
          <MainCategoryElement
            title={mainCategoryList[1]}
            icon={
              <FontAwesome5 name="pump-soap" size={54} color={Colors.default} />
            }
          />
          <MainCategoryElement
            title={mainCategoryList[2]}
            icon={
              <MaterialIcons
                name="home-repair-service"
                size={54}
                color={Colors.default}
              />
            }
          />
        </View>
        <View style={styles.categoryRow}>
          <MainCategoryElement
            selected={Colors.selected}
            title={mainCategoryList[3]}
            icon={
              <FontAwesome name="automobile" size={54} color={Colors.default} />
            }
          />
          <MainCategoryElement
            selected={null}
            title={mainCategoryList[4]}
            icon={<Entypo name="home" size={54} color={Colors.default} />}
          />
          <MainCategoryElement
            title={mainCategoryList[5]}
            icon={
              <MaterialIcons name="computer" size={54} color={Colors.default} />
            }
          />
        </View>
        <View style={styles.categoryRow}>
          <MainCategoryElement
            title={mainCategoryList[6]}
            icon={
              <FontAwesome5 name="redhat" size={54} color={Colors.default} />
            }
          />
          <MainCategoryElement
            title={mainCategoryList[7]}
            icon={<Feather name="pen-tool" size={54} color={Colors.default} />}
          />
          <MainCategoryElement
            title={mainCategoryList[8]}
            icon={
              <MaterialIcons
                name="family-restroom"
                size={54}
                color={Colors.default}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  elements: {
    marginTop: 20,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
