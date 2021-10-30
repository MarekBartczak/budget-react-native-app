import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ExternalComponent from "../../components/ExternalComponentWithGradient/ExternalComponentWithGradient";
import FilterComponent from "../../components/raport/filterComponent/FilterComponent";
import Colors from "../../constants/Colors";
import fontScale from "../../constants/FontScale";
import { dataLang, selectLang } from "../../lang/lang";
const RaportScreen = (props) => {
  const scheme = useSelector((state) => state.config.scheme);

  const userEmail = useSelector((state) => state.auth.userEmail);
  const raportEmail = useSelector((state) => state.raport.email);
  const updateDefaultEmail = useSelector(
    (state) => state.raport.updateDefaultEmail
  );
  const lang = useSelector((state) => state.config.language);
  const translate = (word) => {
    return selectLang(lang, dataLang, word);
  };

  const raportWrongEmailInfo = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: Dimensions.get("window").width * 0.8,
          backgroundColor: Colors[scheme].primary,
          height: Dimensions.get("window").height * 0.3,
          margin: Dimensions.get("window").width * 0.1,
          borderRadius: 10,
          shadowColor: Colors[scheme].drawerActive,
          shadowOffset: { height: 1, width: 0 },
          shadowOpacity: 1,
          shadowRadius: 5,
        }}
      >
        <Text
          style={{
            marginVertical: 20,
            fontFamily: "Kanit_600SemiBold",
            fontSize: fontScale(9),
            color: Colors[scheme].primarySecond,
          }}
        >
          !! {translate("RAPORT NIEDOSTĘPNY")} !!
        </Text>
        <Text
          style={{
            fontFamily: "Kanit_400Regular",
            fontSize: fontScale(7),

            color: Colors[scheme].primarySecond,
          }}
        >
          {translate("Zmień domyślny adres email")}
        </Text>

        <Text
          style={{
            fontFamily: "Kanit_400Regular",
            fontSize: fontScale(5),
            color: Colors[scheme].primarySecond,
          }}
        >
          *| {translate("Ustawienia")} | {translate("konto")} |{" "}
          {translate("Zmień domyślny adres email")} |
        </Text>
      </View>
    );
  };
  const checkEmail = () => {
    if (!userEmail.includes("@privaterelay.appleid.com")) {
      return true;
    } else {
      return false;
    }
  };
  checkEmail();
  return (
    <ExternalComponent>
      <View>
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        >
          {checkEmail() ? <FilterComponent /> : raportWrongEmailInfo()}
        </View>
      </View>
    </ExternalComponent>
  );
};

const styles = StyleSheet.create({});

export default RaportScreen;
