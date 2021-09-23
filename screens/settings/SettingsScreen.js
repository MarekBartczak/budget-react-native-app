import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import Settings from "../../components/settings/Settings";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
const SettingsScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  return (
    <ExternalComponent>
      <View style={{ backgroundColor: Colors[scheme].light }}>
        <View
          style={{
            marginTop: Dimensions.get("window").height * 0.1,
            alignItems: "center",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        >
          <Settings />
        </View>
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
