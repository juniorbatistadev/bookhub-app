import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import en from "../i18n/en.json";
import es from "../i18n/es.json";

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [language, setLanguage] = useState();
  const [languagePreference, setLanguagePreference] = useState("auto");
  const [theme, setTheme] = useState(); //dark or light
  const [themePreference, setThemePreference] = useState("auto"); //auto, dark or light
  const scheme = useColorScheme();

  i18n.translations = { en, es };
  i18n.fallbacks = true;

  i18n.locale = language;

  //theme effect
  useEffect(() => {
    const getPreferences = async () => {
      const savedPreference = await AsyncStorage.getItem("themePreference");
      const userThemePreference = savedPreference || themePreference;

      const theme =
        userThemePreference === "auto" ? scheme : userThemePreference;

      setTheme(theme);
    };

    getPreferences();
  }, [scheme, themePreference]);

  //language effect
  useEffect(() => {
    const getLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("languagePreference");
      const userLanguagePreference = savedLanguage || languagePreference;

      const language =
        userLanguagePreference === "auto"
          ? Localization.locale
          : userLanguagePreference;

      setLanguage(language);
    };

    getLanguage();
  }, [Localization.locale, languagePreference]);

  return (
    <PreferencesContext.Provider
      value={{
        language: { name: language, setLanguagePreference },
        theme: { name: theme, setTheme, setThemePreference },
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
