import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import FilterComponent from "./filterComponent/FilterComponent";
const RaportScreen = (props) => {
  return (
    <ExternalComponent>
      <View>
        <View
          style={{
            // justifyContent: "center",
            // alignItems: "center",
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").height * 0.9,
          }}
        >
          <FilterComponent />
        </View>
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({});

export default RaportScreen;
