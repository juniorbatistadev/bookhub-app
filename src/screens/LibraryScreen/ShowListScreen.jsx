import React from "react";
import { FlatList, Text, View } from "react-native";
import { getThemedStyles } from "../../themesStyles";
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
      console.log("asd");
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Books")
        .where("isFinished", "==", true)
        .limit(10)
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
        .limit(10)
        .get()
        .then((querySnapshot) => {
          setBooks(querySnapshot.docs.map((doc) => doc.data()));
          setIsLoading(false);
        });
    };

    const getBookByListId = async () => {
      setBooks(list?.data.books);
      setIsLoading(false);
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

  const renderItem = (book) => (
    <DisplayBook
      title={book.item.title}
      image={book.item.cover}
      authors={book.item.authors}
      pagesRead={book.item.pagesRead || 0}
      pagesTotal={book.item.totalPages}
      isFinished={book.item.isFinished}
    />
  );

  console.log(books);

  return (
    <View>
      <Text style={themedText}>{list?.data.listName}</Text>

      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.title + index}
      />
    </View>
  );
}

export default ShowListScreen;
