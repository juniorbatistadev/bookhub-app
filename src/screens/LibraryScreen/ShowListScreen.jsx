import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getThemedStyles, sizes } from "../../themesStyles";
import { useColorScheme } from "react-native";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import DisplayBook from "../../components/DisplayBook/DisplayBook";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function ShowListScreen({ route }) {
  const list = route?.params?.list;

  const scheme = useColorScheme();
  const { themedText } = getThemedStyles(scheme);

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
        .get()
        .then((querySnapshot) => {
          setBooks(querySnapshot.docs.map((doc) => doc.data()));
          setIsLoading(false);
        });
    };

    const getBookByListId = async () => {
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Books")
        .where("lists", "array-contains", list.id)
        .get()
        .then((querySnapshot) => {
          setBooks(querySnapshot.docs.map((doc) => doc.data()));
          setIsLoading(false);
        });
    };

    if (list.id === "readList") {
      getReadBooks();
    }

    if (list.id === "readLater") {
      getReadLaterBooks();
    }

    if (list.id !== "readList" && id !== "readLater") {
      getBookByListId();
    }
  }, []);

  const renderItem = (book) => <DisplayBook book={book.item} />;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: sizes.l, ...styles.title, ...themedText }}>
        {list?.data.listName}
      </Text>

      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.title + index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Jost_700Bold",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingVertical: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
});

export default ShowListScreen;
