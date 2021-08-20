import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import { useSelector } from "react-redux";
const UserScreen = (props) => {
  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userPhotoUrl = useSelector((state) => state.auth.userPhotoUrl);

  return (
    <ExternalComponent>
      <View style={styles.screen}>
        <View style={styles.photoView}>
          <View style={styles.photoExternal}>
            <Image style={styles.photo} source={{ url: userPhotoUrl }} />
          </View>
        </View>
        <View style={styles.userDataView}>
          <View style={styles.userNameView}>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <View style={styles.userEmailView}>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
          <View style={styles.familyAccountWith}>
            <Text style={styles.family}>Konto rodzinne </Text>
            <Text style={styles.userEmail}>nie</Text>
          </View>
        </View>
      </View>
    </ExternalComponent>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  familyAccountWith: {
    flexDirection: "row",
  },
  family: {
    // fontWeight: "bold",
    // color: Colors.backGroundChart,
    fontSize: 15,
  },
  userNameView: {
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  userName: {
    fontWeight: "bold",
    color: Colors.google,
    fontSize: 25,
  },

  userEmailView: {
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  userEmail: {
    fontWeight: "bold",
    color: Colors.backGroundChart,
    fontSize: 15,
  },
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  photoView: {
    marginTop: 40,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  photoExternal: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accent,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: Dimensions.get("window").width * 0.35,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  photo: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").width * 0.6,
    borderRadius: Dimensions.get("window").width * 0.3,
  },
  userDataView: {
    marginTop: 40,
    // backgroundColor: Colors.banner,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
