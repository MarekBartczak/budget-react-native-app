import { StyleSheet, Text, View, Dimensions, Switch } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import * as raportActions from "../../store/actions/raport";
import * as configActions from "../../store/actions/config";
const AccountSettings = (props) => {
  const dispatch = useDispatch();
  const scheme = useSelector((state) => state.config.scheme);
  const defaultEmail = useSelector((state) => state.auth.userEmail);
  const isEnabled = useSelector((state) => state.raport.diffrentEmail);
  const dangerZone = useSelector((state) => state.config.toogleDangerZone);
  const deleteAccount = useSelector((state) => state.config.deleteAccount);

  const sendRaportEveryMonth = useSelector(
    (state) => state.raport.sendRaportEveryMonth
  );

  const toggleDeleteAccount = () => {
    dispatch(configActions.toggleDeleteAccount(!deleteAccount));
  };
  const toogleDangerZoneFunc = () => {
    dispatch(configActions.toggleDangerZone(!dangerZone));
  };
  const toggleSwitchMonthlyraport = () => {
    dispatch(raportActions.toggleMonthlyRaport(!sendRaportEveryMonth));
  };
  const toggleSwitch = () => {
    dispatch(raportActions.toggleDefaultEmail(!isEnabled));
  };
  return (
    <ExternalComponent>
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
            {defaultEmail}
          </Text>
        </View>

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
                  isEnabled
                    ? Colors[scheme].headerTintColor
                    : Colors[scheme].headerTintColor
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchMonthlyraport}
                value={sendRaportEveryMonth}
              />
            </View>
          </View>
        </View>

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
                Zmień domyślny email
              </Text>
            </View>
            <View>
              <Switch
                trackColor={{
                  false: "#767577",
                  true: Colors[scheme].button,
                }}
                thumbColor={
                  isEnabled
                    ? Colors[scheme].headerTintColor
                    : Colors[scheme].headerTintColor
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>

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
                  isEnabled
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
                    isEnabled
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
      </View>
    </ExternalComponent>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
