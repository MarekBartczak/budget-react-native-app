import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
const FixedIncome = (props) => {
  return (
    <View>
      <FlatList
        data={props.filteredList}
        keyExtractor={(key, index) => key + index}
        renderItem={(item) => (
          <View style={{ backgroundColor: "white", marginBottom: 20 }}>
            <Text>{item.item.date}</Text>
            <Text>{item.item.title}</Text>
            <Text>{item.item.from}</Text>
            <Text>{item.item.cost}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FixedIncome;

const styles = StyleSheet.create({});
