import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import DisplayBook from "@components/DisplayBook/DisplayBook";
import FloatingIlustration from "@res/icons/floating.svg";
import { ActivityIndicator } from "react-native";

function BooksTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Books")
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          const books = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setIsLoading(false);
          setData(books);
        });
    };

    getData();
  }, []);

  const renderItem = (book) => <DisplayBook book={book.item} />;

  return (
    <View>
      {!isLoading ? (
        data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.title + index}
          />
        ) : (
          <View style={{ height: "100%" }}>
            <FloatingIlustration width="80%" style={{ marginTop: "auto" }} />
          </View>
        )
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

export default BooksTab;
