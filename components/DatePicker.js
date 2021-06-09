import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../constants/Colors";

const DatePicker = (props) => {
  //   const changeDate = (event, date) => {
  //     console.log(date);
  //   };
  return (
    <View style={styles.pickADate}>
      <RNDateTimePicker
        style={{
          height: 50,
          width: "85%",
          alignItems: "center",
          justifyContent: "center",
        }}
        locale="pl-PL"
        maximumDate={new Date()}
        timeZoneOffsetInMinutes={0}
        testID="dateTimePicker"
        value={props.date}
        mode={"date"}
        is24Hour={true}
        display="spinner"
        textColor={"black"}
        onChange={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickADate: {
    // width: "100%",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
});

export default DatePicker;
