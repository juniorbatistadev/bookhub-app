import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getThemedStyles, sizes } from "../../themesStyles";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import DisplayBook from "../../components/DisplayBook/DisplayBook";
import { useState } from "react";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import { useNavigation } from "@react-navigation/native";
import i18n from "i18n-js";

function ShowListScreen({ route }) {
  const list = route?.params?.list;

  const { theme } = useContext(PreferencesContext);
  const { themedText } = getThemedStyles(theme.name);

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const getReadBooks = async () => {
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Books")
        .where("isFinished", "==", true)
        .get()
        .then((querySnapshot) => {
          setBooks(querySnapshot.docs.map((doc) => doc.data()));
          setIsLoading(false);
        });
    };

    const getReadLaterBooks = async () => {
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Books")
        .where("lists", "array-contains", "readLater")
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
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Books")
        .where("lists", "array-contains", list.id)
        .onSnapshot((querySnapshot) => {
          const books = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setIsLoading(false);
          setBooks(books);
        });
    };

    if (list.id === "readList") {
      getReadBooks();
    }

    if (list.id === "readLater") {
      getReadLaterBooks();
    }

    if (list.id !== "readList" && list.id !== "readLater") {
      getBookByListId();
    }
  }, []);

  const handleDelete = async () => {
    await firestore()
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Lists")
      .doc(list.id)
      .delete();

    navigation.goBack();
  };

  const renderItem = (book) => (
    <DisplayBook book={book.item} displayOnList={true} list={list.id} />
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: sizes.l, ...styles.title, ...themedText }}>
        {list?.data.listName}
      </Text>
      {list.id !== "readList" && list.id !== "readLater" && (
        <Pressable onPress={handleDelete}>
          <Text style={styles.deleteText}>{i18n.t("library.deleteList")}</Text>
        </Pressable>
      )}

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.title + index}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Jost_700Bold",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
  deleteText: {
    fontFamily: "Jost_700Bold",
    marginBottom: 30,
    color: "gray",
    fontSize: sizes.m,
  },
});

export default ShowListScreen;
