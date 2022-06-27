import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Pressable, Image } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { colors, getThemedStyles, sizes } from "@/themesStyles";
import { Picker } from "@react-native-picker/picker";
import { PreferencesContext } from "@/contexts/PreferencesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { useEffect } from "react";

export default function AccountScreen() {
  const { currentUser } = useContext(AuthContext);
  const [selectedTheme, setSelectedTheme] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const preferences = useContext(PreferencesContext);

  const { themedContainer, themedHeader } = getThemedStyles(
    preferences.theme.name
  );

  const logOut = () => {
    auth().signOut();
  };

  const handleThemeChange = async (theme) => {
    setSelectedTheme(theme);
    await AsyncStorage.setItem("themePreference", theme);

    preferences.theme.setThemePreference(theme);
  };

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem("languagePreference", language);

    preferences.language.setLanguagePreference(language);
  };

  useEffect(() => {
    const getPreferences = async () => {
      const savedTheme = await AsyncStorage.getItem("themePreference");
      const savedLanguage = await AsyncStorage.getItem("languagePreference");

      setSelectedTheme(savedTheme);
      setSelectedLanguage(savedLanguage);
    };

    getPreferences();
  }, []);

  return (
    <View style={[styles.container, themedContainer]}>
      <Image
        style={styles.avatar}
        source={{
          uri: currentUser.photoURL,
        }}
      />
      <Text style={{ fontSize: sizes.l, ...styles.username, ...themedHeader }}>
        {currentUser.displayName}
      </Text>
      <Text style={{ fontSize: sizes.m, ...styles.email, ...themedHeader }}>
        {currentUser.email}
      </Text>

      <View style={{ ...styles.settings }}>
        <View style={styles.optionContainer}>
          <Text style={{ ...styles.optionText, ...themedHeader }}>
            {i18n.t("account.theme")}
          </Text>
          <Picker
            selectedValue={selectedTheme}
            onValueChange={handleThemeChange}
            dropdownIconColor={
              preferences.theme.name === "dark"
                ? colors.white
                : colors.darkGreen
            }
            style={{
              width: 200,
              marginLeft: "auto",
              color:
                preferences.theme.name === "dark"
                  ? colors.white
                  : colors.darkGreen,
            }}
          >
            <Picker.Item label={i18n.t("account.autoDetect")} value="auto" />
            <Picker.Item label={i18n.t("account.light")} value="light" />
            <Picker.Item label={i18n.t("account.dark")} value="dark" />
          </Picker>
        </View>
        <View style={styles.optionContainer}>
          <Text style={{ ...styles.optionText, ...themedHeader }}>
            {i18n.t("account.language")}
          </Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={handleLanguageChange}
            dropdownIconColor={
              preferences.theme.name === "dark"
                ? colors.white
                : colors.darkGreen
            }
            style={{
              width: 200,
              marginLeft: "auto",
              color:
                preferences.theme.name === "dark"
                  ? colors.white
                  : colors.darkGreen,
            }}
          >
            <Picker.Item label={i18n.t("account.autoDetect")} value="auto" />
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Español" value="es" />
          </Picker>
        </View>
        <View style={styles.optionContainer}>
          <Pressable onPress={logOut}>
            <Text style={{ ...styles.optionText, ...themedHeader }}>
              {i18n.t("account.logOut")}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  username: {
    fontFamily: "Jost_700Bold",
    marginTop: 20,
  },
  email: {
    fontFamily: "Jost_400Regular",
  },

  settings: {
    marginTop: 40,
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  optionText: {
    fontFamily: "Jost_700Bold",
    fontSize: sizes.l,
  },
  optionContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
});
