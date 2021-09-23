import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import CustomTheme from "../../components/settings/view/CustomTheme";
import * as configActions from "../../store/actions/config";
const ViewSettings = (props) => {
  const dispatch = useDispatch();
  const scheme = useSelector((state) => state.config.scheme);
  const isEnabled = useSelector((state) => state.config.customScheme);
  const toggleSwitch = () => {
    dispatch(configActions.toggleCustomTheme(!isEnabled));
  };
  return (
    <ExternalComponent>
      <View
        style={{
          ...styles.screen,
          ...{ backgroundColor: Colors[scheme].light },
        }}
      >
        <View
          style={{
            ...styles.customTheme,
            ...{ backgroundColor: Colors[scheme].primary },
          }}
        >
          <View>
            <Text
              style={{
                ...styles.customThemeText,
                ...{ color: Colors[scheme].primarySecond },
              }}
            >
              Kolory niestandardowe?
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{
                false: "#767577",
                true: Colors[scheme].button,
              }}
              thumbColor={
                isEnabled
                  ? Colors[scheme].headerTintColor
                  : Colors[scheme].headerTintColor
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        {isEnabled && <CustomTheme />}
      </View>
    </ExternalComponent>
  );
};

export default ViewSettings;

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  customThemeText: {
    marginLeft: 20,
    fontFamily: "Kanit_400Regular",
  },
  customTheme: {
    borderRadius: 20,
    padding: 5,
    width: Dimensions.get("window").width * 0.9,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
});
