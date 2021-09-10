import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const ListElement = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <View style={styles.ListElement}>
      <View
        style={{
          ...styles.item,
          ...{ borderBottomColor: Colors[scheme].primaryThird },
        }}
      >
        <View style={styles.textStyle}>
          <Text
            style={{
              color: Colors[scheme].primarySecond,
              fontFamily: "Kanit_600SemiBold",
            }}
          >
            {props.mainCategory.toUpperCase()}{" "}
            <Text
              style={{
                color: Colors[scheme].primarySecond,
                fontFamily: "Kanit_400Regular",
              }}
            >
              {" "}
              {props.subCategory.toUpperCase()}
            </Text>
          </Text>
          <Text
            style={{
              ...styles.category,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {props.category}
          </Text>
        </View>
        <Text style={{ color: Colors[scheme].primarySecond }}>
          {Number(props.cost).toFixed(2)}zł
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ListElement: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    fontSize: 9,
  },
  textStyle: { flexDirection: "column" },
  item: {
    borderBottomWidth: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginVertical: 3,
  },
});

export default ListElement;
