import { StyleSheet, Text, View, Dimensions } from "react-native";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import SelectComponent from "../../components/raport/sendEmail/selectComponent/SelectComponent";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
const SendRaportScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  return (
    <ExternalComponent>
      <View>
        <View
          style={{
            backgroundColor: Colors[scheme].light,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
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
