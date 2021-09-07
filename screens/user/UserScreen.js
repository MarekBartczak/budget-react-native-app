import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import { useSelector } from "react-redux";
const UserScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userPhotoUrl = useSelector((state) => state.auth.userPhotoUrl);

  return (
    <ExternalComponent>
      <View style={styles.screen}>
        <View style={styles.photoView}>
          <View style={styles[`photoExternal_${scheme}`]}>
            <Image style={styles.photo} source={{ url: userPhotoUrl }} />
          </View>
        </View>
        <View style={styles.userDataView}>
          <View style={styles[`userNameView_${scheme}`]}>
            <Text style={styles[`userName_${scheme}`]}>{userName}</Text>
          </View>
          <View style={styles[`userEmailView_${scheme}`]}>
            <Text style={styles[`userEmail_${scheme}`]}>{userEmail}</Text>
          </View>
          {/* <View style={styles.familyAccountWith}>
            <Text style={styles[`family_${scheme}`]}>Konto rodzinne </Text>
            <Text style={styles[`userEmail_${scheme}`]}>nie</Text>
          </View> */}
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
  family_light: {
    fontSize: 15,
    color: Colors.light.primarySecond,
  },
  family_dark: {
    fontSize: 15,
    color: Colors.dark.primarySecond,
  },
  userNameView_light: {
    backgroundColor: Colors.light.primaryThird,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  userNameView_dark: {
    backgroundColor: Colors.dark.primaryThird,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  userName_light: {
    fontWeight: "bold",
    color: Colors.light.primarySecond,
    fontSize: 25,
  },
  userName_dark: {
    fontWeight: "bold",
    color: Colors.dark.primarySecond,
    fontSize: 25,
  },

  userEmailView_light: {
    backgroundColor: Colors.light.primaryThird,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  userEmailView_dark: {
    backgroundColor: Colors.dark.primaryThird,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  userEmail_light: {
    fontWeight: "bold",
    color: Colors.light.primarySecond,
    fontSize: 15,
  },
  userEmail_dark: {
    fontWeight: "bold",
    color: Colors.dark.primarySecond,
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
  photoExternal_light: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.primaryThird,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: Dimensions.get("window").width * 0.35,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  photoExternal_dark: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.primaryThird,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: Dimensions.get("window").width * 0.35,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
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
