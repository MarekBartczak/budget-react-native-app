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

const FilterList = (props) => {
  const [filter, showFilter] = useState(false);

  const close = () => {
    showFilter(!filter);
  };
  return (
    <TouchableOpacity onPress={() => showFilter(!filter)}>
      <MaterialIcons name="filter-list" size={30} color={Colors.primary} />

      <Modal animationType="slide" transparent={true} visible={filter}>
        <View style={styles.filter}>
          <TouchableOpacity onPress={() => showFilter(!filter)}>
            <View style={styles.closeBtn}>
              <Text style={{ color: "white" }}>zamknij</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.filterContainer}>
            <View style={styles.filterList}>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 20,
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
    backgroundColor: Colors.shadowColor,
    marginLeft: "10%",
    width: "80%",
    height: "80%",
    marginTop: "10%",
    alignItems: "flex-end",
  },
  closeBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  filterContainer: {
    width: "100%",
    alignItems: "center",
  },
  filterList: {
    width: "100%",
    height: "98%",
    marginTop: 20,
    backgroundColor: Colors.shadowColorLight,
  },
});
