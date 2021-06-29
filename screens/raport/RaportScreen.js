import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const RaportScreen = (props) => {
  const stackScreen = (name, component, option) => {
    return <Stack.Screen name={name} component={component} options={option} />;
  };
  const Raport = () => (
    <View>
      <LinearGradient
        colors={[
          Colors.gradientBackground.primary,
          Colors.gradientBackground.secondary,
        ]}
        style={styles.background}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Text>Raport</Text>
      </View>
    </View>
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.primary,
        headerStyle: {
          backgroundColor: Colors.gradientBackground.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      {stackScreen("Raport", Raport, ({ navigation }) => ({
        headerTitle: "Raport",
        headerLeft: () => (
          <TouchableOpacity
            style={{
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 20,
            }}
            onPress={() => navigation.toggleDrawer()}
          >
            <MaterialCommunityIcons
              name="menu"
              size={34}
              color={Colors.primary}
            />
          </TouchableOpacity>
        ),
      }))}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});

export default RaportScreen;
