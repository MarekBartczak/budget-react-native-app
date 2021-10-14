import * as AppleAuthentication from "expo-apple-authentication";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
const AppleLogin = (props) => {
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);
  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
  }, []);
  return (
    <React.Fragment>
      {isAppleLoginAvailable && (
        <View style={{ alignItems: "center" }}>
          <AppleAuthentication.AppleAuthenticationButton
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            cornerRadius={25}
            onPress={props.press}
            style={{ width: "100%", height: 50 }}
          />
        </View>
      )}
    </React.Fragment>
  );
};

export default AppleLogin;
