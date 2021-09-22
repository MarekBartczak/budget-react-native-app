import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import React from "react";
import ExternalComponent from "../ExternalComponentWithGradient/ExternalComponentWithGradient";
import { useSelector } from "react-redux";
import IncomeElement from "./incomeElement/IncomeElement";
const IncomeList = (props) => {
  const incomeList = useSelector((state) => state.income.income);
  return (
    <ExternalComponent>
      <View style={styles.list}>
        <View>
          <FlatList
            data={incomeList}
            renderItem={(itemData) => (
              <IncomeElement
                el={itemData.item}
                keyExtractor={(itemData) => itemData.id}
                press={() =>
                  props.navigation.navigate("IncomeDetails", {
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

export default IncomeList;

const styles = StyleSheet.create({
  list: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
});
