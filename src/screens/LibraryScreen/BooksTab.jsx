import { View, FlatList, Pressable } from "react-native";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import DisplayBook from "../../components/DisplayBook/DisplayBook";
import { useNavigation } from "@react-navigation/native";

function BooksTab() {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();

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
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.title + index}
      />
    </View>
  );
}

export default BooksTab;
