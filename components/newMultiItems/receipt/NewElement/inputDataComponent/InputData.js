import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExternalComponent from "../../../../ExternalComponentWithGradient/ExternalComponentWithGradient";
const InputData = (props) => {
  return (
    <ExternalComponent>
      <View>
        <Text>input</Text>
      </View>
    </ExternalComponent>
  );
};

export default InputData;

const styles = StyleSheet.create({});
