import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../constants/Colors";

const DatePicker = (props) => {
  return (
    <View style={styles.pickADate}>
      <RNDateTimePicker
        style={{
          height: 50,
          width: "80%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
        locale="pl-PL"
        maximumDate={new Date()}
        testID="dateTimePicker"
        value={props.date}
        mode={"date"}
        is24Hour={true}
        display="spinner"
        textColor={Colors.accent}
        onChange={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickADate: {
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
});

export default DatePicker;
