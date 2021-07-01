import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
const AddNewFixedExpenseComponent = (props) => {
  return (
    <View style={styles.addNewFixedExpenseComponent}>
      <View style={styles.inner}>
        <View style={styles.descriptionComponent}>
          <Text style={styles.textDefault}>Nowy stały wydatek</Text>
        </View>
      </View>
    </View>
  );
};

export default AddNewFixedExpenseComponent;

const styles = StyleSheet.create({
  addNewFixedExpenseComponent: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.45,
    backgroundColor: Colors.gradientBackground.third,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    backgroundColor: Colors.gradientBackground.third,
    borderRadius: 10,
    height: "95%",
    width: "95%",
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  descriptionComponent: {
    marginLeft: 10,
    marginTop: -10,
    backgroundColor: Colors.gradientBackground.third,
    width: 150,
    alignItems: "center",
  },
  textDefault: {
    fontWeight: "bold",
  },
});
