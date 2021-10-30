import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import summaryCostCounter from "../../../functions/summaryCostCounter";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import fontScale from "../../../constants/FontScale";
import { dataLang, selectLang } from "../../../lang/lang";
const Expense = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };
  return (
    <View>
      <View
        style={{
          ...styles.summary,
          ...{ backgroundColor: Colors[scheme].light },
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
          {translate("razem").toUpperCase()}{" "}
          {summaryCostCounter(props.filteredList)} PLN
        </Text>
      </View>
      <View>
        <FlatList
          style={{ marginBottom: 150 }}
          data={props.filteredList}
          keyExtractor={(key, index) => key + index}
          renderItem={(item) => (
            <View
              style={{
                backgroundColor: Colors[scheme].light,
                shadowColor: "black",
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 0.25,
                shadowRadius: 5,
                paddingBottom: 5,
                marginBottom: 20,
                padding: 10,
                width: "100%",
                elevation: 7,
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
                  {item.item.place
                    ? item.item.place.toUpperCase()
                    : item.item.title.toUpperCase()}
                </Text>

                <Text style={{ color: Colors[scheme].primarySecond }}>
                  {item.item.cost} PLN
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
