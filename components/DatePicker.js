import { StyleSheet, View } from "react-native";
import React from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = (props) => {
  return (
    <View style={styles.pickADate}>
      <RNDateTimePicker
        style={{
          height: 50,
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
        }}
        locale="pl-PL"
        maximumDate={props.maxDate}
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
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
});

export default DatePicker;
