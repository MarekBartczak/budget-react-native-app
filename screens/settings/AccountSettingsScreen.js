import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import deleteDataInCloud from "../../functions/cloud/deleteDataInCloud";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import * as raportActions from "../../store/actions/raport";
import * as configActions from "../../store/actions/config";
import * as authActions from "../../store/actions/auth";
import deleteAccountPermanently from "./deleteAccountPermanently";
const AccountSettings = (props) => {
  const dispatch = useDispatch();
  const scheme = useSelector((state) => state.config.scheme);
  const defaultEmail = useSelector((state) => state.auth.userEmail);
  const changeDefaultEmail = useSelector((state) => state.raport.diffrentEmail);
  const setUpdateDefaultEmail = useSelector(
    (state) => state.raport.updateDefaultEmail
  );
  const customEmailForRaport = useSelector((state) => state.raport.email);
  const dangerZone = useSelector((state) => state.config.toogleDangerZone);
  const deleteAccount = useSelector((state) => state.config.deleteAccount);
  const [deleteAccountEmail, setDeleteAccountEmail] = useState();
  const [newEmail, setNewEmail] = useState(customEmailForRaport);
  const sendRaportEveryMonth = useSelector(
    (state) => state.raport.sendRaportEveryMonth
  );

  const updateEmail = () => {
    dispatch(raportActions.updateDefaultEmail(true));
    dispatch(raportActions.setEmail(newEmail));
  };

  const toggleDeleteAccount = () => {
    dispatch(configActions.toggleDeleteAccount(!deleteAccount));
  };
  const toogleDangerZoneFunc = () => {
    dispatch(configActions.toggleDangerZone(!dangerZone));
  };
  const toggleSwitchMonthlyraport = () => {
    dispatch(raportActions.toggleMonthlyRaport(!sendRaportEveryMonth));
  };
  const toggleDefaultEmail = () => {
    dispatch(raportActions.toggleDefaultEmail(!changeDefaultEmail));
  };
  useEffect(() => {
    if (dangerZone === false) {
      dispatch(configActions.toggleDeleteAccount(false));
      setDeleteAccountEmail();
    }
    if (deleteAccount === false) {
      setDeleteAccountEmail();
    }
  }, [dangerZone, deleteAccount]);

  const showAdressEmail = () => {
    if (
      changeDefaultEmail === true &&
      customEmailForRaport !== "" &&
      setUpdateDefaultEmail === true
    ) {
      return customEmailForRaport;
    } else {
      return defaultEmail;
    }
  };

  const TouchableOpacityCustom = (props) => {
    if (deleteAccountEmail === defaultEmail) {
      return (
        <TouchableOpacity
          style={{
            marginBottom: 10,
            shadowColor: "black",
            shadowOffset: { height: 0, width: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            marginTop: 10,
            backgroundColor: Colors[scheme].primary,
            alignItems: "center",
          }}
          onPress={() => {
            dispatch(configActions.toggleDangerZone(!dangerZone));
            dispatch(authActions.showIndicator(false));

            deleteAccountPermanently();
            firebase
              .auth()
              .signOut()
              .then((res) => {
                console.log("logout");

                // clearStateAfterLogout();
                // Sign-out successful.
              })
              .catch((error) => console.log(error));

            dispatch(authActions.logout(false));
          }}
        >
          {props.children}
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={{
            marginBottom: 10,
            shadowColor: "white",
            shadowOffset: { height: 0, width: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            marginTop: 10,
            backgroundColor: Colors[scheme].light,
            alignItems: "center",
          }}
        >
          {props.children}
        </View>
      );
    }
  };

  const updateDefaultEmail = () => {
    if (changeDefaultEmail === true) {
      return (
        <View style={{ alignItems: "center" }}>
          <TextInput
            value={newEmail}
            autoComplete="off"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={setNewEmail}
            placeholderTextColor={Colors[scheme].primaryThird}
            placeholder="adres email"
            style={{
              backgroundColor: Colors[scheme].light,
              margin: 20,
              padding: 10,
              width: Dimensions.get("window").width * 0.9,
              shadowColor: "black",
              shadowOffset: { height: 0, width: 0 },
              shadowOpacity: 0.25,
              shadowRadius: 5,
              borderRadius: 3,
            }}
          />
          <TouchableOpacity
            onPress={() => updateEmail()}
            style={{
              padding: 10,
              shadowColor: "black",
              shadowOffset: { height: 0, width: 0 },
              shadowOpacity: 0.25,
              shadowRadius: 5,
              backgroundColor: Colors[scheme].primary,
              width: Dimensions.get("window").width * 0.3,
              borderRadius: 3,
              margin: 10,
            }}
          >
            <Text style={{ color: Colors[scheme].button, textAlign: "center" }}>
              ZMIEŃ
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={"position"}
      // style={{ flex: 1 }}
      keyboardVerticalOffset={-50}
      enabled
    >
      <ExternalComponent>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              ...styles.screen,
              ...{ backgroundColor: Colors[scheme].light },
            }}
          >
            <View style={{ ...styles.head, ...{} }}>
              <Text
                style={{
                  ...styles.text,
                  ...{ color: Colors[scheme].primarySecond },
                }}
              >
                Wysyłaj raport na adres
              </Text>
              <Text
                style={{
                  ...styles.text,
                  ...{ color: Colors[scheme].primarySecond },
                }}
              >
                {showAdressEmail()}
              </Text>
            </View>

            {/* <View>
              <View
                style={{
                  ...styles.customTheme,
                  ...{ backgroundColor: Colors[scheme].primary },
                }}
              >
                <View>
                  <Text
                    style={{
                      ...styles.customThemeText,
                      ...{ color: Colors[scheme].primarySecond },
                    }}
                  >
                    Automatycznie wysyłaj raport
                  </Text>
                </View>
                <View>
                  <Switch
                    trackColor={{
                      false: "#767577",
                      true: Colors[scheme].button,
                    }}
                    thumbColor={
                      sendRaportEveryMonth
                        ? Colors[scheme].headerTintColor
                        : Colors[scheme].headerTintColor
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchMonthlyraport}
                    value={sendRaportEveryMonth}
                  />
                </View>
              </View>
            </View> */}

            <View>
              <View
                style={{
                  ...styles.customTheme,
                  ...{ backgroundColor: Colors[scheme].primary },
                }}
              >
                <View>
                  <Text
                    style={{
                      ...styles.customThemeText,
                      ...{ color: Colors[scheme].primarySecond },
                    }}
                  >
                    Zmień domyślny adres email
                  </Text>
                </View>
                <View>
                  <Switch
                    trackColor={{
                      false: "#767577",
                      true: Colors[scheme].button,
                    }}
                    thumbColor={
                      changeDefaultEmail
                        ? Colors[scheme].headerTintColor
                        : Colors[scheme].headerTintColor
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDefaultEmail}
                    value={changeDefaultEmail}
                  />
                </View>
              </View>
            </View>
            <View>{updateDefaultEmail()}</View>

            <View>
              <View
                style={{
                  ...styles.customTheme,
                  ...{ backgroundColor: Colors[scheme].delete },
                }}
              >
                <View>
                  <Text
                    style={{
                      ...styles.customThemeText,
                      ...{ color: Colors[scheme].primarySecond },
                    }}
                  >
                    Strefa niebezpieczna
                  </Text>
                </View>
                <View>
                  <Switch
                    trackColor={{
                      false: "#767577",
                      true: Colors[scheme].google,
                    }}
                    thumbColor={
                      dangerZone
                        ? Colors[scheme].headerTintColor
                        : Colors[scheme].headerTintColor
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toogleDangerZoneFunc}
                    value={dangerZone}
                  />
                </View>
              </View>
            </View>

            {dangerZone && (
              <View>
                <View
                  style={{
                    ...styles.customTheme,
                    ...{ backgroundColor: Colors[scheme].delete },
                  }}
                >
                  <View>
                    <Text
                      style={{
                        ...styles.customThemeText,
                        ...{ color: Colors[scheme].primarySecond },
                      }}
                    >
                      Usuwanie konta
                    </Text>
                  </View>
                  <View>
                    <Switch
                      trackColor={{
                        false: "#767577",
                        true: Colors[scheme].google,
                      }}
                      thumbColor={
                        deleteAccount
                          ? Colors[scheme].headerTintColor
                          : Colors[scheme].headerTintColor
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleDeleteAccount}
                      value={deleteAccount}
                    />
                  </View>
                </View>
              </View>
            )}
            {deleteAccount && (
              <View>
                <View
                  style={{
                    ...styles.deleteAccount,
                    ...{ backgroundColor: Colors[scheme].delete },
                  }}
                >
                  <Text
                    style={{
                      color: Colors[scheme].headerTintColor,
                      textAlign: "center",
                      padding: 4,
                    }}
                  >
                    Aby usnąć konto przepisz poniższy email
                  </Text>
                  <Text
                    style={{
                      color: Colors[scheme].drawerActive,
                      textAlign: "center",
                      padding: 4,
                    }}
                  >
                    {defaultEmail}
                  </Text>
                  <TextInput
                    value={deleteAccountEmail}
                    onChangeText={setDeleteAccountEmail}
                    enablesReturnKeyAutomatically={true}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    style={{
                      backgroundColor: Colors[scheme].primaryThird,
                      padding: 10,
                      width: Dimensions.get("window").width * 0.8,
                      marginHorizontal: 20,
                      color: Colors[scheme].headerTintColor,
                      borderRadius: 3,
                      textAlign: "center",
                      marginBottom: 20,
                    }}
                  />
                </View>
                <TouchableOpacityCustom>
                  <View
                    style={{
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors[scheme].button,
                        fontFamily: "Kanit_600SemiBold",
                        textAlign: "center",
                      }}
                    >
                      !! USUWAM KONTO BEZPOWROTNIE !!
                    </Text>
                  </View>
                </TouchableOpacityCustom>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ExternalComponent>
    </KeyboardAvoidingView>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  deleteAccount: {
    marginTop: 20,
    width: Dimensions.get("window").width * 0.9,
    // height: Dimensions.get("window").height * 0.2,
    borderRadius: 3,

    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    alignItems: "center",
  },
  head: {
    marginTop: 30,
  },
  text: { fontFamily: "Kanit_400Regular", fontSize: 20, textAlign: "center" },
  customThemeText: {
    marginLeft: 20,
    fontFamily: "Kanit_400Regular",
  },
  customTheme: {
    borderRadius: 20,
    padding: 5,
    width: Dimensions.get("window").width * 0.9,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
});
