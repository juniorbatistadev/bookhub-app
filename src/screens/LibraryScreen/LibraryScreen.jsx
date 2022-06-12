import { StyleSheet, Text, View, FlatList } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import DisplayBook from "../../components/DisplayBook/DisplayBook";
import DisplayList from "../../components/DisplayList/DisplayList";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { getThemedStyles } from "../../themesStyles";
import { useColorScheme } from "react-native";

export default function LibraryScreen() {
  const { currentUser } = useContext(AuthContext);
  const [tab, setTab] = useState("books");
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const { themedContainer, themedHeader } = getThemedStyles(scheme);

  useEffect(() => {
    const getData = async () => {
      const books = await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Books")
        .get();

      setData(books.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  const handleTabPress = (tab) => {
    setTab(tab);
  };

  const onBookPress = (book) => {
    navigation.push("Home", {
      screen: "AddBook",
      params: {
        book: {
          title: book.title,
          authors: book.authors ? book.authors : null,
          image: book.cover,
          pages: book.totalPages,
          pagesRead: book.pagesRead,
          action: "edit",
          id: book.id,
          notes: book.notes,
          isFinished: book.isFinished,
        },
      },
    });
  };

  const renderItem = (book) => (
    <Pressable onPress={() => onBookPress(book.item)}>
      <DisplayBook
        title={book.item.title}
        image={book.item.cover}
        authors={book.item.authors}
        pagesRead={book.item.pagesRead || 0}
        pagesTotal={book.item.totalPages}
        isFinished={book.item.isFinished}
      />
    </Pressable>
  );

  return (
    <View style={[styles.container, themedContainer]}>
      <View style={styles.tabs}>
        <Pressable onPress={() => handleTabPress("books")}>
          <Text
            style={
              tab === "books"
                ? [styles.activeTab, themedHeader]
                : styles.inactiveTab
            }
          >
            Books
          </Text>
        </Pressable>
        <Pressable onPress={() => handleTabPress("lists")}>
          <Text
            style={
              tab === "lists"
                ? [styles.activeTab, themedHeader]
                : styles.inactiveTab
            }
          >
            Lists
          </Text>
        </Pressable>
      </View>
      <View style={styles.tabContent}>
        {tab === "books" && (
          <View>
            <FlatList
              style={styles.list}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => item.title + index}
            />
          </View>
        )}
        {tab === "lists" && (
          <View>
            <DisplayList name="Books you’ve read" id="readList" />
            <DisplayList name="To read later" />
            <DisplayList name="Favorites" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 15,
  },

  tabs: {
    flexDirection: "row",
  },

  tabContent: {
    marginTop: 35,
  },

  activeTab: {
    fontSize: 21,
    fontFamily: "Jost_700Bold",
    marginRight: 20,
  },

  inactiveTab: {
    color: "#BFBFBF",
    fontSize: 21,
    fontFamily: "Jost_700Bold",
    marginRight: 20,
  },
});
