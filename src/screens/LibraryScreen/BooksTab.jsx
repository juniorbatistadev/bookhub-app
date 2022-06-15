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
        .onSnapshot((querySnapshot) => {
          const books = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setData(books);
        });
    };

    getData();
  }, []);

  const renderItem = (book) => <DisplayBook book={book.item} />;

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
