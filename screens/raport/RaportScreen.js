import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import FilterComponent from "../../components/raport/filterComponent/FilterComponent";
const RaportScreen = (props) => {
  return (
    <ExternalComponent>
      <View>
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
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
