import { StyleSheet, View, useColorScheme } from "react-native";
import React from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

const DatePicker = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  return (
    <View style={styles.pickADate}>
      <RNDateTimePicker
        style={{
          height: 90,
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
        textColor={Colors[scheme].button}
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
