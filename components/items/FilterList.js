import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
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
        color={Colors[scheme].primarySecond}
      />

      <Modal animationType="slide" transparent={true} visible={filter}>
        <View
          style={{
            ...styles.filter,
            ...{ backgroundColor: Colors[scheme].primaryThird },
          }}
        >
          <TouchableOpacity onPress={() => showFilter(!filter)}>
            <View
              style={{
                ...styles.closeBtn,
                ...{ backgroundColor: Colors[scheme].button },
              }}
            >
              <Text style={{ color: Colors[scheme].primary }}>zamknij</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.filterContainer}>
            <View
              style={{
                ...styles.filterList,
                ...{ backgroundColor: Colors[scheme].primaryThird },
              }}
            >
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 20,
                  backgroundColor: Colors[scheme].primaryThird,
                }}
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
    marginLeft: "10%",
    width: "80%",
    height: "80%",
    marginTop: "10%",
    alignItems: "flex-end",
    borderRadius: 10,
    paddingBottom: 70,
    // shadowColor: "black",
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
  },
  closeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderTopRightRadius: 10,
  },
  filterContainer: {
    width: "100%",
    alignItems: "center",
  },
  filterList: {
    width: "100%",
    height: "98%",
    marginTop: 20,
    // backgroundColor: Colors.light.primaryThird,
  },
});
