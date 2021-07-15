import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import ListOfElements from "./listOfElements/ListOfElements";
const RaportScreen = (props) => {
  return (
    <ExternalComponent>
      <View>
        <View
          style={{
            // justifyContent: "center",
            // alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ListOfElements />
        </View>
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({});

export default RaportScreen;
