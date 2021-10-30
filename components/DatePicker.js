import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useMemo } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import fontScale from "../constants/FontScale";

const DatePicker = (props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const lang = useSelector((state) => state.config.language);

  const scheme = useSelector((state) => state.config.scheme);
  const show = Platform.OS === "ios";
  const showAndroid = Platform.OS === "android";
  const currentDate = new Date().toISOString().slice(0, 10);

  let local = "pl_PL";

  if (lang === "en") {
    local = "en_EN";
  }
  if (lang === "default") {
    local = "pl_PL";
  }
  const androidDatePicker = () => {
    return showDatePicker && datePicker();
  };

  const datePicker = () => {
    return (
      <RNDateTimePicker
        style={{
          height: 90,
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
        }}
        locale={local}
        maximumDate={props.maxDate}
        timeZoneOffsetInMinutes={0}
        testID="dateTimePicker"
        value={props.date}
        mode={"date"}
        is24Hour={true}
        display="spinner"
        textColor={Colors[scheme].button}
        onChange={(event, date) => {
          if (date !== undefined) {
            props.onChange(event, date);
            if (event.type === "set") {
              setShowDatePicker(false);
            }
          }
        }}
        // onChange={props.onChange}
      />
    );
  };
  return (
    <View style={styles.pickADate}>
      {show && datePicker()}
      {showAndroid && (
        <View>
          <TouchableOpacity
            onPress={() => setShowDatePicker(!showDatePicker)}
            style={{
              flexDirection: "row",
              width: Dimensions.get("window").width * 0.8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Kanit_600SemiBold",
                fontSize: fontScale(10),
                color: Colors[scheme].button,
              }}
            >
              {props.date ? props.date.toISOString().slice(0, 10) : currentDate}
            </Text>
            <View style={{ marginLeft: 20 }}>
              <Entypo
                name="calendar"
                size={fontScale(10)}
                color={Colors[scheme].button}
              />
            </View>
          </TouchableOpacity>
          {androidDatePicker()}
        </View>
      )}
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
