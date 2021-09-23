import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
const ViewSettings = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  return (
    <View>
      <Text>Widok</Text>
    </View>
  );
};

export default ViewSettings;

const styles = StyleSheet.create({});
