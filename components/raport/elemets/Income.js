import { StyleSheet, Text, View, FlatList, useColorScheme } from "react-native";
import React from "react";
import summaryCostCounter from "../../../functions/summaryCostCounter";
import Colors from "../../../constants/Colors";
const Income = (props) => {
  return (
    <View>
      <View style={styles.summary}>
        <Text style={styles.summaryTest}>
          razem: {summaryCostCounter(props.filteredList)}zł
        </Text>
      </View>
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
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{item.item.date}</Text>
                <Text>{item.item.cost}zł</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{item.item.from}</Text>
                <Text>{item.item.title}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Income;

const styles = StyleSheet.create({
  summary: {
    backgroundColor: Colors.accent,
  },
  summaryTest: {
    marginRight: 20,
    textAlign: "right",
    fontSize: 15,
    marginBottom: 10,
  },
});
