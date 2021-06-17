import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const miniCard = (props) => {
  return (
    <View style={styles.miniCard}>
      <View style={styles.miniCardDate}>
        <Text style={styles.miniCardDateText}>
          {props.date.toISOString().slice(0, 10)}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: 100,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <View style={styles.miniCardContentTop}>
          <View style={styles.miniCardContentTopPlace}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                textAlign: "left",
                paddingLeft: 2,
              }}
            >
              {props.place}
            </Text>
          </View>
          <View style={styles.miniCardContentTopCategory}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                textAlign: "right",
                paddingRight: 2,
              }}
            >
              {props.category}
            </Text>
          </View>
          <View style={styles.miniCardContentName}>
            <Text
              style={{
                paddingTop: 15,
                fontSize: 11,
                color: Colors.primary,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {props.itemName}
            </Text>
          </View>
          <View style={styles.miniCardContentCost}>
            <Text
              style={{
                paddingTop: 15,
                fontSize: 11,
                color: Colors.accent,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {props.cost} {props.cost ? "zł" : null}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default miniCard;

const styles = StyleSheet.create({
  miniCard: {
    maxWidth: 120,
    paddingTop: 10,
    flexDirection: "column",
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { height: 10, width: 0 },
    shadowColor: Colors.primary,
    shadowRadius: 10,
  },
  miniCardDate: {
    backgroundColor: Colors.banner,
    width: 120,
    height: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  miniCardDateText: {
    color: Colors.primary,
    textAlign: "center",
  },
  miniCardContentTop: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
