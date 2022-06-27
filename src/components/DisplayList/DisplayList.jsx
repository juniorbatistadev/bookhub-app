import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors, getThemedStyles, sizes } from "../../themesStyles";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import defaultCover from "@res/images/defaultCover.png";
import { useNavigation } from "@react-navigation/native";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import i18n from "i18n-js";

function DisplayList({ name, id, data }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { theme } = useContext(PreferencesContext);
  const { themedHeader, themedText } = getThemedStyles(theme.name);
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const getReadBooks = async () => {
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Books")
        .where("isFinished", "==", true)
        .limit(10)
        .onSnapshot((querySnapshot) => {
          const books = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setIsLoading(false);
          setBooks(books);
        });
    };

    const getReadLaterBooks = async () => {
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Books")
        .where("lists", "array-contains", "readLater")
        .limit(10)
        .onSnapshot((querySnapshot) => {
          const books = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setIsLoading(false);
          setBooks(books);
        });
    };

    const getBookByListId = async () => {
      setBooks(data?.books);
      setIsLoading(false);
    };

    if (id === "readList") {
      getReadBooks();
    }

    if (id === "readLater") {
      getReadLaterBooks();
    }

    if (id !== "readList" && id !== "readLater") {
      getBookByListId();
    }
  }, []);

  const renderItem = ({ item }) => {
    return (
      <>
        {item.isLastOne ? (
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              padding: 5,
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("ListScreen", { list: { name, id, data } })
              }
            >
              <Text style={[{ fontFamily: "Jost_700Bold" }, themedText]}>
                {i18n.t("library.seeList")}
              </Text>
            </Pressable>
          </View>
        ) : (
          <Image
            style={styles.cover}
            source={item.cover ? { uri: item.cover } : defaultCover}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          books?.length > 0 &&
          navigation.navigate("ListScreen", { list: { name, id, data } })
        }
      >
        <View style={styles.header}>
          <Text style={[{ ...styles.title, fontSize: sizes.m }, themedHeader]}>
            {name}
          </Text>
          <AntDesign
            name="right"
            size={13}
            style={styles.icon}
            color={theme.name === "dark" ? colors.white : colors.darkGreen}
          />
        </View>
      </Pressable>
      {isLoading ? (
        <ActivityIndicator />
      ) : books?.length > 0 ? (
        <FlatList
          style={styles.list}
          horizontal
          data={[...books, { isLastOne: true }]}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.title + index}
        />
      ) : (
        <Text style={themedText}>{i18n.t("library.noBooksAdded")} </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    marginTop: 10,
  },

  title: {
    color: "#1F3D35",
    fontSize: 16,
    fontFamily: "Jost_700Bold",
  },
  cover: {
    width: 70,
    height: 110,
    marginRight: 10,
  },
  icon: {
    marginLeft: 10,
  },
});

export default DisplayList;
