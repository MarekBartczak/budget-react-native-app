import { StyleSheet, Text, View, useColorScheme } from "react-native";
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
              ...styles.itemName,
              ...{ color: Colors[scheme].primarySecond },
            }}
          >
            {props.itemName}{" "}
            <Text
              style={{
                ...styles.multiply,
                ...{ color: Colors[scheme].primarySecond },
              }}
            >
              {" "}
              [x{props.multiply}]
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
          {(props.cost * props.multiply).toFixed(2)}zł
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  multiply: {
    fontWeight: "normal",
  },
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
  itemName: {
    fontWeight: "bold",
  },
});

export default ListElement;
