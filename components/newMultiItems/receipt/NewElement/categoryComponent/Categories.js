import { StyleSheet, Text, View, Dimensions } from "react-native";
import CategoriesList from "../../../../../data/category";
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

const Categories = (props) => {
  const [headerHeight, setHeaderHeight] = useState(useHeaderHeight());
  const categoriesListObjectKeys = Object.keys(CategoriesList);
  const mainCategoryList = categoriesListObjectKeys.map(
    (el) => CategoriesList[el].name
  );
  let iconSize = 32;
  return (
    <ExternalComponent style={styles.screen}>
      <View style={styles.external}>
        <View style={styles.elements}>
          <View style={styles.inner}>
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
                    color={Colors.defaultThemeLight.primaryDark}
                  />
                }
              />
              <MainCategoryElement
                title={mainCategoryList[1]}
                icon={
                  <FontAwesome5
                    name="pump-soap"
                    size={iconSize}
                    color={Colors.defaultThemeLight.primaryDark}
                  />
                }
              />
              <MainCategoryElement
                title={mainCategoryList[2]}
                icon={
                  <MaterialIcons
                    name="home-repair-service"
                    size={iconSize}
                    color={Colors.defaultThemeLight.primaryDark}
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
                    color={Colors.defaultThemeLight.primaryDark}
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
                    color={Colors.defaultThemeLight.primaryDark}
                  />
                }
              />
              <MainCategoryElement
                title={mainCategoryList[5]}
                icon={
                  <MaterialIcons
                    name="computer"
                    size={iconSize}
                    color={Colors.defaultThemeLight.primaryDark}
                  />
                }
              />

              <MainCategoryElement
                title={mainCategoryList[6]}
                icon={
                  <FontAwesome5
                    name="redhat"
                    size={iconSize}
                    color={Colors.defaultThemeLight.primaryDark}
                  />
                }
              />
              <MainCategoryElement
                title={mainCategoryList[7]}
                icon={
                  <Feather
                    name="pen-tool"
                    size={iconSize}
                    color={Colors.defaultThemeLight.primaryDark}
                  />
                }
              />
              <MainCategoryElement
                title={mainCategoryList[8]}
                icon={
                  <MaterialIcons
                    name="family-restroom"
                    size={iconSize}
                    color={Colors.defaultThemeLight.primaryDark}
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
    // backgroundColor: Colors.accent,
    padding: 5,
    // borderRadius: 30,
  },

  //   inner: {
  //     // width: "100%",
  //     // height: "100%",
  //     backgroundColor: Colors.accent,
  //     // backgroundColor: "red",
  //     padding: 20,
  //     borderRadius: 30,
  //     borderColor: Colors.gradientBackground.primary,
  //     borderWidth: 5,
  //     // shadowColor: "black",
  //     // shadowOffset: { height: 0, width: 0 },
  //     // shadowOpacity: 0.4,
  //     // shadowRadius: 20,
  //   },
  categoryLeftColumn: {
    // height: Dimensions.get("window").height - headerHeight,
    // flexDirection: "column",
    // alignItems: "flex-start",
    // justifyContent: "space-around",
    // alignItems: "center",
  },
});
