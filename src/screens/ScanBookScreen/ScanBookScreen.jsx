import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getBookByCode } from "../../utils/booksApi";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

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
      Alert.alert(
        "Oh no!",
        "We couldn't find this book, try adding it manually.",
        [
          {
            text: "Try Again",
            onPress: () => setScanned(false),
          },
          {
            text: "Add Manually",
            onPress: () => navigation.push("Home", { screen: "AddBook" }),
          },
        ]
      );
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Point the camera to your book's barcode and make sure is focused.
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
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
});
