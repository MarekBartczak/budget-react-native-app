import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
const SettingsScreen = (props) => {
  return (
    <ExternalComponent>
      <View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Text>Ustawienia</Text>
        </View>
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
