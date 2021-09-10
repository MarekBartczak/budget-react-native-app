import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import FilterElement from "./FilterElement";
import Colors from "../../constants/Colors";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const FilterList = (props) => {
  const scheme = useSelector((state) => state.config.scheme);
  const [filter, showFilter] = useState(false);

  const close = () => {
    showFilter(!filter);
  };
  return (
    <TouchableOpacity onPress={() => showFilter(!filter)}>
      <MaterialIcons
        name="filter-list"
        size={30}
        color={Colors[scheme].button}
      />

      <Modal animationType="slide" transparent={true} visible={filter}>
        <View
          style={{
            ...styles.filter,
            ...{},
          }}
        >
          <TouchableOpacity onPress={() => showFilter(!filter)}>
            <View
              style={{
                ...styles.closeBtn,
                ...{ backgroundColor: Colors[scheme].primary },
              }}
            >
              <Text
                style={{
                  color: Colors[scheme].button,

                  fontFamily: "Kanit_600SemiBold",
                }}
              >
                {"zamknij".toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.filterContainer}>
            <View
              style={{
                ...styles.filterList,
                ...{},
              }}
            >
              <FlatList
                data={props.listData}
                keyExtractor={(item, index) => "item" + index}
                renderItem={(itemData) => (
                  <FilterElement
                    data={itemData.item}
                    callBack={props.callBack}
                    close={close}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default FilterList;

const styles = StyleSheet.create({
  filter: {
    width: Dimensions.get("window").width,
    // height: "50%",
    marginTop: Dimensions.get("window").height / 2,
    alignItems: "flex-end",
    borderRadius: 10,
    // shadowColor: "black",
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
  },
  closeBtn: {
    height: 50,

    width: Dimensions.get("window").width,
    marginTop: -30,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    width: "100%",
    alignItems: "center",
  },
  filterList: {
    width: "100%",
    height: "98%",
    // backgroundColor: Colors.light.primaryThird,
  },
});
