import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import ExternalComponent from "../ExternalComponentWithGradient/ExternalComponentWithGradient";
import { useSelector } from "react-redux";
import FixedIncomeElement from "./fixedIncomeElement/FixedIncomeElement";
const FixedIncomeList = (props) => {
  const fixedIncome = useSelector((state) => state.fixedIncome.fixedIncome);
  return (
    <ExternalComponent>
      <View style={styles.list}>
        <View>
          <FlatList
            data={fixedIncome}
            renderItem={(itemData) => (
              <FixedIncomeElement
                el={itemData.item}
                keyExtractor={(itemData) => itemData.id}
                press={() =>
                  props.navigation.navigate("FixedIncomeDetails", {
                    id: itemData.item.id,
                    cost: itemData.item.cost,
                    title: itemData.item.title,
                    date: itemData.item.date,
                    recipient: itemData.item.from,
                  })
                }
              />
            )}
          />
        </View>
      </View>
    </ExternalComponent>
  );
};

export default FixedIncomeList;

const styles = StyleSheet.create({
  list: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.9,
  },
});
