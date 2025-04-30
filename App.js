import React, { useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import i18n from "i18n-js";
import Store from "./src/redux/Store";
import Router from "./src/Router";
import en from "./src/lang/en.json";
import arabic from "./src/lang/arabic.json";
import { LocalizationContext } from "./src/constants";
import { Container, Root } from "native-base";
import { LogBox } from "react-native";
import { Video } from "expo-av";
i18n.fallbacks = true;
i18n.translations = { arabic, en };

export default () => {
  LogBox.ignoreLogs([`interpolate() was`]);
  const [locale, setLocale] = useState("arabic");
  const [loading, setLoading] = useState(true);
  const localizationContext = useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);
  if (loading) {
    return (
      <Container>
        <Video
          source={require("./src/assets/splash.mp4")}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={{ width: "100%", height: "100%" }}
        />
      </Container>
    );
  }
  return (
    <LocalizationContext.Provider value={localizationContext}>
      <Provider store={Store}>
        <Root>
          <Router />
        </Root>
      </Provider>
    </LocalizationContext.Provider>
  );
};
