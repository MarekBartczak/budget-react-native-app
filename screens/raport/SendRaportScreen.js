import { StyleSheet, Text, View, Dimensions } from "react-native";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import SelectComponent from "../../components/raport/sendEmail/selectComponent/SelectComponent";
import React from "react";
const SendRaportScreen = (props) => {
  return (
    <ExternalComponent>
      <View>
        <View
          style={{
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").height * 0.9,
          }}
        >
          <SelectComponent />
        </View>
      </View>
    </ExternalComponent>
  );
};

export default SendRaportScreen;

const styles = StyleSheet.create({});