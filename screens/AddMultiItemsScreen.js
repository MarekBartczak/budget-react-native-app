import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import switchComaToDot from "../functions/switchCompaToDot";
import NewElement from "../components/newMultiItems/NewElement";
import Colors from "../constants/Colors";

const AddMultiItemsScreen = (props) => {
  const [showModal, setModal] = useState(false);
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [itemList, setItemList] = useState([]);
  return (
    <View>
      <View style={styles.itemsList}>
        <Text> {itemList.length > 0 ? itemList : "lista pusta"} </Text>
        <Button
          title="Nowy"
          color={Colors.primary}
          onPress={() => setModal(!showModal)}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setModal(!showModal)}
      >
        <View style={styles.inputArea}>
          <NewElement
            cost={cost}
            itemName={itemName}
            onSetName={setItemName}
            onSetCost={setCost}
          />
          <Button
            title="Dodaj"
            color={Colors.primary}
            onPress={() => {
              setModal(!showModal);
              const NewEl = {
                date: date.toISOString().slice(0, 10),
                place: place,
                cost: Number(switchComaToDot(cost)),
                itemName: itemName,
              };
              console.log(NewEl);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default AddMultiItemsScreen;

const styles = StyleSheet.create({
  inputArea: {
    width: "100%",
    height: "50%",
    backgroundColor: "rgba(253, 253, 253,0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "100%",
  },
  itemsList: {
    width: "100%",
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
