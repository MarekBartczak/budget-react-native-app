import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import FixedExpenseElement from "../../components/fixedExpense/fixedExpenseElement/FixedExpenseElement";
import { useSelector } from "react-redux";
import ExternalComponent from "../ExternalComponentWithGradient/ExternalComponentWithGradient";

const FixedExpensesList = (props) => {
  const fixedExpensesList = useSelector(
    (state) => state.fixedExpense.fixedExpense
  );
  return (
    <ExternalComponent>
      <View style={styles.fixedExpensesList}>
        <View>
          <FlatList
            data={fixedExpensesList}
            renderItem={(itemData) => (
              <FixedExpenseElement
                el={itemData.item}
                keyExtractor={(itemData) => itemData.id}
                press={() =>
                  props.navigation.navigate("FixedExpenseDetails", {
                    id: itemData.item.id,
                    cost: itemData.item.cost,
                    title: itemData.item.title,
                    date: itemData.item.date,
                    recipient: itemData.item.recipient,
                    isPaid: itemData.item.isPaid,
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

export default FixedExpensesList;

const styles = StyleSheet.create({
  fixedExpensesList: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.9,
    // backgroundColor: Colors.transparent,
    // shadowOffset: { height: 0, width: 0 },
    // shadowColor: Colors.shadowColor,
    // shadowOpacity: 0.9,
    // shadowRadius: 10,
  },
});
