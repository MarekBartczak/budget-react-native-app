import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
const Expense = (props) => {
  return (
    <View>
      <FlatList
        data={props.filteredList}
        keyExtractor={(key, index) => key + index}
        renderItem={(item) => (
          <View style={{ backgroundColor: "white", marginBottom: 20 }}>
            <Text>{item.item.date}</Text>
            <Text>{item.item.name}</Text>
            <Text>{item.item.place}</Text>
            <Text>{item.item.cost}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({});
