import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import { useSelector } from "react-redux";
import * as Application from "expo-application";

const UserScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userPhotoUrl = useSelector((state) => state.auth.userPhotoUrl);

  const expense = useSelector((state) => state.item.items);
  const fixedExpense = useSelector((state) => state.fixedExpense.fixedExpense);
  const income = useSelector((state) => state.income.income);

  const appinfo = require("../../app.json");

  let accountSummary = 0;
  const countSum = (total, sum) => total + sum;

  const expenseCostList = expense.map((el) => el.cost);
  let expenseSum = 0;
  if (expenseCostList.length > 0) {
    expenseSum = expenseCostList.reduce(countSum);
  }

  const incomeCostList = income.map((el) => el.cost);
  let incomeSum = 0;
  if (incomeCostList.length > 0) {
    incomeSum = incomeCostList.reduce(countSum);
  }

  const fixedExpensePaidList = fixedExpense.filter((el) => el.isPaid === true);
  const fixedExpenseCostList = fixedExpensePaidList.map((el) => el.cost);
  let fiexedExpenseSummary = 0;
  if (fixedExpenseCostList.length > 0) {
    fiexedExpenseSummary = fixedExpenseCostList.reduce(countSum);
  }
  console.log(Application);
  accountSummary = incomeSum - expenseSum - fiexedExpenseSummary;

  const showPhoto = () => {
    let photo = null;

    if (userPhotoUrl === null) {
      return (
        <Image
          style={styles.photo}
          source={require("../../assets/avatarList/woman.png")}
        />
      );
    } else {
      photo = userPhotoUrl;
      return <Image style={styles.photo} source={{ url: photo }} />;
    }
  };
  return (
    <ExternalComponent>
      <View
        style={{
          ...styles.screen,
          ...{ backgroundColor: Colors[scheme].backGround },
        }}
      >
        <View
          style={{
            ...styles.photoView,
            ...{
              backgroundColor: Colors[scheme].backGroundOne,
              borderColor: Colors[scheme].backGround_one,
              shadowColor: Colors[scheme].drawerActive,
            },
          }}
        >
          <View style={{ ...styles.photoExternal, ...{} }}>{showPhoto()}</View>
          <View
            style={{
              backgroundColor: Colors[scheme].light,
              padding: 3,
              paddingHorizontal: 20,
              borderRadius: 10,

              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: Colors[scheme].button,
                fontFamily: "Kanit_400Regular",
                fontSize: 15,
              }}
            >
              STAN KONTA {"  "}
            </Text>
            <Text
              style={{
                color: Colors[scheme].button,
                fontFamily: "Kanit_600SemiBold",
                fontSize: 15,
              }}
            >
              {accountSummary.toFixed(2)} PLN
            </Text>
          </View>
        </View>
        <View style={styles.userDataView}>
          <View style={{ ...styles.userNameView, ...{} }}>
            <Text
              style={{
                ...styles.userName,
                ...{ color: Colors[scheme].primarySecond },
              }}
            >
              {userName.toUpperCase()}
            </Text>
          </View>
          <View style={{ ...styles.userEmailView, ...{} }}>
            <Text
              style={{
                ...styles.userEmail,
                ...{ color: Colors[scheme].primarySecond },
              }}
            >
              {userEmail}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: Colors[scheme].primaryThird,
                fontFamily: "Kanit_400Regular",
              }}
            >
              Wersja: {appinfo.expo.version}
            </Text>
            <Text
              style={{
                color: Colors[scheme].primaryThird,
                fontFamily: "Kanit_400Regular",
              }}
            >
              Kompilacja: {appinfo.expo.ios.buildNumber}
            </Text>
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
    fontSize: 15,
    color: Colors.light.primarySecond,
  },

  userNameView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width,
    alignItems: "center",
    marginBottom: 50,

    // shadowColor: "black",
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
  },

  userName: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 20,
  },

  userEmailView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width,
    alignItems: "center",
    marginBottom: 50,
    // shadowColor: "black",
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
  },

  userEmail: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 15,
  },

  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  photoView: {
    // marginTop: 40,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    // borderLeftWidth: 5,
    // borderRightWidth: 5,
    // borderBottomWidth: 5,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 5,
  },
  photoExternal: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.7,
  },

  photo: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").width * 0.6,
    borderRadius: Dimensions.get("window").width * 0.3,
  },
  userDataView: {
    marginTop: 20,
    // backgroundColor: Colors.banner,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
