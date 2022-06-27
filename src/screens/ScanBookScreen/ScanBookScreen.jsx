import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getBookByCode } from "../../utils/booksApi";
import { useNavigation } from "@react-navigation/native";
import { getThemedStyles } from "../../themesStyles";
import { useContext } from "react";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import i18n from "i18n-js";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const { theme } = useContext(PreferencesContext);
  const { themedText, themedContainer } = getThemedStyles(theme.name);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    const result = await getBookByCode(data);
    if (result) {
      navigation.push("Home", {
        screen: "AddBook",
        params: {
          book: {
            title: result.volumeInfo?.title,
            authors: result.volumeInfo?.authors,
            image: result.volumeInfo.imageLinks?.thumbnail,
            pages: result.volumeInfo?.pageCount,
          },
        },
      });
    } else {
      Alert.alert("Oh no!", i18n.t("scanBook.noFound"), [
        {
          text: i18n.t("misc.tryAgain"),
          onPress: () => setScanned(false),
        },
        {
          text: i18n.t("scanBook.addManually"),
          onPress: () => navigation.push("Home", { screen: "AddBook" }),
        },
      ]);
    }
  };

  if (hasPermission === null) {
    return (
      <Text style={[styles.text, themedText]}>
        {i18n.t("scanBook.requestingPermission")}
      </Text>
    );
  }
  if (hasPermission === false) {
    return (
      <Text style={[styles.text, themedText]}>
        {i18n.t("scanBook.noAccesCamera")}
      </Text>
    );
  }

  return (
    <View style={[styles.container, themedContainer]}>
      <Text style={[styles.text, themedText]}>
        {i18n.t("scanBook.helpText")}
      </Text>
      <BarCodeScanner
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.ean13,
          BarCodeScanner.Constants.BarCodeType.ean8,
        ]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanCamera}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    fontFamily: "Jost_400Regular",
    marginLeft: 10,
    width: "80%",
  },
  scanCamera: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    width: "100%",
    height: "100%",
  },
});
