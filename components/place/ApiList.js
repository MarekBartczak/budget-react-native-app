import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiElement from "./apiElement/ApiElement";

const ApiList = (props) => {
  const [sourceList, setSourceList] = useState("");

  const searchFavPlace = (placeYouLookingFor) => {
    const url = "https://autocomplete.clearbit.com/v1/companies/suggest?query=";
    if (placeYouLookingFor.length > 0) {
      axios
        .get(url + placeYouLookingFor)
        .then((res) => {
          setSourceList(res.data);
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    searchFavPlace(props.source);
  }, [props.source]);
  return (
    <View style={styles.apiList}>
      <FlatList
        keyExtractor={(item) => item.domain}
        data={sourceList}
        renderItem={(item) => (
          <ApiElement
            logo={item.item.logo}
            name={item.item.name}
            closeWindow={() => props.closeWindow()}
          />
        )}
      />
    </View>
  );
};

export default ApiList;

const styles = StyleSheet.create({
  apiList: {
    width: "100%",
    alignItems: "center",
  },
});
