import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import Colors from "../../../../../constants/Colors";
import MainCategoryElement from "./MainCategoryElement";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import SubCategoryList from "./SubCategoryList";
import ExternalComponent from "../../../../ExternalComponentWithGradient/ExternalComponentWithGradient";
import { useHeaderHeight } from "@react-navigation/stack";
import { useSelector } from "react-redux";

const Categories = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const categoriesList = useSelector((state) => state.item.categoryList)[0];
  const [headerHeight, setHeaderHeight] = useState(useHeaderHeight());
  const categoriesListObjectKeys = Object.keys(categoriesList);
  const mainCategoryList = categoriesListObjectKeys.map(
    (el) => categoriesList[el].name
  );
  let iconSize = 32;
  return (
    <ExternalComponent style={styles.screen}>
      <View style={styles.external}>
        <View style={styles.elements}>
          <View>
            <View
              style={{
                height: Dimensions.get("window").height - headerHeight,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <MainCategoryElement
                title={mainCategoryList[0]}
                icon={
                  <MaterialCommunityIcons
                    name="food-variant"
                    size={iconSize}
                    color={Colors[scheme].primarySecond}
                  />
                }
              />
              <MainCategoryElement
                title={mainCategoryList[1]}
                icon={
                  <FontAwesome5
                    name="pump-soap"
                    size={iconSize}
                    color={Colors[scheme].primarySecond}
                  />
                }
              />
              <MainCategoryElement
                title={mainCategoryList[2]}
                icon={
                  <MaterialIcons
                    name="home-repair-service"
                    size={iconSize}
                    color={Colors[scheme].primarySecond}
                  />
                }
              />

              <MainCategoryElement
                selected={Colors.selected}
                title={mainCategoryList[3]}
                icon={
                  <FontAwesome
                    name="automobile"
                    size={iconSize}
                    color={Colors[scheme].primarySecond}
                  />
                }
              />
              <MainCategoryElement
                selected={null}
                title={mainCategoryList[4]}
                icon={
                  <Entypo
                    name="home"
                    size={iconSize}
                    color={Colors[scheme].primarySecond}
                  />
                }
              />
              <MainCategoryElement
                title={mainCategoryList[5]}
                icon={
                  <MaterialIcons
                    name="computer"
                    size={iconSize}
                    color={Colors[scheme].primarySecond}
                  />
                }
              />

              <MainCategoryElement
                title={mainCategoryList[6]}
                icon={
                  <FontAwesome5
                    name="redhat"
                    size={iconSize}
                    color={Colors[scheme].primarySecond}
                  />
                }
              />
              <MainCategoryElement
                title={mainCategoryList[7]}
                icon={
                  <Feather
                    name="pen-tool"
                    size={iconSize}
                    color={Colors[scheme].primarySecond}
                  />
                }
              />
              <MainCategoryElement
                title={mainCategoryList[8]}
                icon={
                  <MaterialIcons
                    name="family-restroom"
                    size={iconSize}
                    color={Colors[scheme].primarySecond}
                  />
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.subCategory}>
          <SubCategoryList />
        </View>
      </View>
    </ExternalComponent>
  );
};

export default Categories;

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  external: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
  },
  elements: {
    marginTop: 5,
    padding: 5,
  },
});
