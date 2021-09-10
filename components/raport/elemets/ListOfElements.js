import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import summaryCostCounter from "../../../functions/summaryCostCounter";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";

const Expense = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <View>
      <View
        style={{
          ...styles.summary,
          ...{ borderColor: Colors[scheme].primary },
        }}
      >
        <Text
          style={{
            ...styles.summaryTest,
            ...{
              color: Colors[scheme].primaryThird,
              fontFamily: "Kanit_600SemiBold",
            },
          }}
        >
          {"razem:".toUpperCase()} {summaryCostCounter(props.filteredList)}zł
        </Text>
      </View>
      <View>
        <FlatList
          data={props.filteredList}
          keyExtractor={(key, index) => key + index}
          renderItem={(item) => (
            <View
              style={{
                borderColor: Colors[scheme].primary,
                marginBottom: 20,
                padding: 10,
                width: "100%",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors[scheme].primarySecond,
                    fontFamily: "Kanit_600SemiBold",
                  }}
                >
                  {item.item.place.toUpperCase()}
                </Text>

                <Text style={{ color: Colors[scheme].primarySecond }}>
                  {item.item.cost}zł
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: Colors[scheme].primaryThird }}>
                  {item.item.date}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  summary: {
    paddingVertical: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    // shadowOffset: { height: 0, width: 0 },
    // shadowRadius: 7,
    // shadowColor: "black",
    // shadowOpacity: 0.5,
  },
  summaryTest: {
    marginRight: 20,
    textAlign: "right",
    fontSize: 15,
  },
});
