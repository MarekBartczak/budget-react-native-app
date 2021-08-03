import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
const Income = (props) => {
  return (
    <View>
      <FlatList
        data={props.filteredList}
        keyExtractor={(key, index) => key + index}
        renderItem={(item) => (
          <View
            style={{
              backgroundColor: "white",
              marginBottom: 20,
              borderRadius: 10,
              padding: 10,
              width: "100%",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{item.item.date}</Text>
              <Text>{item.item.cost}zł</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{item.item.from}</Text>
              <Text>{item.item.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Income;

const styles = StyleSheet.create({});
