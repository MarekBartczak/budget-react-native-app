import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../../../../constants/Colors";
import MainCategoryElement from "./MainCategoryElement";
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
    <ExternalComponent style={{ ...styles.screen, ...{} }}>
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
                icon={"automobile"}
                iconSize={iconSize}
              />

              <MainCategoryElement
                iconSize={iconSize}
                title={mainCategoryList[3]}
                icon={"food-variant"}
              />

              <MainCategoryElement
                iconSize={iconSize}
                title={mainCategoryList[4]}
                icon={"pump-soap"}
              />
              <MainCategoryElement
                iconSize={iconSize}
                title={mainCategoryList[8]}
                icon={"home-repair-service"}
              />

              <MainCategoryElement
                iconSize={iconSize}
                title={mainCategoryList[5]}
                icon={"home"}
              />
              <MainCategoryElement
                iconSize={iconSize}
                title={mainCategoryList[6]}
                icon={"computer"}
              />

              <MainCategoryElement
                iconSize={iconSize}
                title={mainCategoryList[1]}
                icon={"redhat"}
              />
              <MainCategoryElement
                iconSize={iconSize}
                title={mainCategoryList[7]}
                icon={"pen-tool"}
              />
              <MainCategoryElement
                iconSize={iconSize}
                title={mainCategoryList[2]}
                icon={"family-restroom"}
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
