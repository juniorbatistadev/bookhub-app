import { StyleSheet, Text, View, FlatList } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import DisplayBook from "../../components/DisplayBook/DisplayBook";
import DisplayList from "../../components/DisplayList/DisplayList";
import firestore from "@react-native-firebase/firestore";

export default function LibraryScreen() {
  const { currentUser } = useContext(AuthContext);
  const [tab, setTab] = useState("books");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const books = await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Books")
        .get();

      setData(books.docs.map((doc) => doc.data()));
    };

    getData();
  }, []);

  const handleTabPress = (tab) => {
    setTab(tab);
  };

  // const data = [
  //   {
  //     title: "Love Does",
  //     image:
  //       "https://books.google.com/books/content?id=kRUz8yq4HJUC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73kPYNvNrcU8wD6W8aDCMgikdo6L1s2yUGkyZqWNVIHAQ2WXHnH4VE3NF487G7OzPefytHO7AA_JdkstPNBPFAI20fkhbAa2-FmKQ5pR5qB7aDpwEm09Uazmv_JQyVUcbPKFW87&source=gbs_api",
  //     author: "Bob Goff",
  //     pagesRead: 56,
  //     pagesTotal: 130,
  //   },
  //   {
  //     title: "Twilight",
  //     image:
  //       "https://books.google.com/books/content?id=lGjFtMRqp_YC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73SviBoBjlunaHh_JffCjUxSVgdw7fJvRI2QF28vuP_QkufJdoW6bQgDHgzKUEBBoaSjKzonRkpvJkm0WQzfKI0TjK5C_fTQ49c-Jw02smre7DI4OY6y7RSTn410-NneeepuSxk&source=gbs_api",
  //     author: "Stephenie Meyer",
  //     pagesRead: 0,
  //     pagesTotal: 560,
  //   },
  //   {
  //     title: "The Fault in Our Stars",
  //     image:
  //       "https://books.google.com/books/content?id=UzqVUdEtLDwC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71NDPRZXxv4ZewxGyqfPWb5Llep27gNbNPrhoY4U8Noj1htIMgM-3xib122NPCyGTn2R76WYKO2CCmEg5LcIZ0DdP4prc1jKdMMkbu82pmuLO3ZRZ-2Na9G1IMnmHpmbtVKiRyd&source=gbs_api",
  //     author: "John Green",
  //     pagesRead: 322,
  //     pagesTotal: 322,
  //   },
  //   {
  //     title: "Love Does",
  //     image:
  //       "https://books.google.com/books/content?id=kRUz8yq4HJUC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73kPYNvNrcU8wD6W8aDCMgikdo6L1s2yUGkyZqWNVIHAQ2WXHnH4VE3NF487G7OzPefytHO7AA_JdkstPNBPFAI20fkhbAa2-FmKQ5pR5qB7aDpwEm09Uazmv_JQyVUcbPKFW87&source=gbs_api",
  //     author: "Bob Goff",
  //     pagesRead: 56,
  //     pagesTotal: 130,
  //   },
  //   {
  //     title: "Twilight",
  //     image:
  //       "https://books.google.com/books/content?id=lGjFtMRqp_YC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73SviBoBjlunaHh_JffCjUxSVgdw7fJvRI2QF28vuP_QkufJdoW6bQgDHgzKUEBBoaSjKzonRkpvJkm0WQzfKI0TjK5C_fTQ49c-Jw02smre7DI4OY6y7RSTn410-NneeepuSxk&source=gbs_api",
  //     author: "Stephenie Meyer",
  //     pagesRead: 0,
  //     pagesTotal: 560,
  //   },
  //   {
  //     title: "The Fault in Our Stars",
  //     image:
  //       "https://books.google.com/books/content?id=UzqVUdEtLDwC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71NDPRZXxv4ZewxGyqfPWb5Llep27gNbNPrhoY4U8Noj1htIMgM-3xib122NPCyGTn2R76WYKO2CCmEg5LcIZ0DdP4prc1jKdMMkbu82pmuLO3ZRZ-2Na9G1IMnmHpmbtVKiRyd&source=gbs_api",
  //     author: "John Green",
  //     pagesRead: 322,
  //     pagesTotal: 322,
  //   },
  // ];

  const renderItem = (book) => (
    <DisplayBook
      title={book.item.title}
      image={book.item.cover}
      authors={book.item.authors}
      pagesRead={book.item.pagesRead || 0}
      pagesTotal={book.item.totalPages}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Pressable onPress={() => handleTabPress("books")}>
          <Text style={tab === "books" ? styles.activeTab : styles.inactiveTab}>
            Books
          </Text>
        </Pressable>
        <Pressable onPress={() => handleTabPress("lists")}>
          <Text style={tab === "lists" ? styles.activeTab : styles.inactiveTab}>
            Lists
          </Text>
        </Pressable>
      </View>
      <View style={styles.tabContent}>
        {tab === "books" && (
          <View style={styles.books}>
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
            <DisplayList name="Books you’ve read" />
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
    color: "#1F3D35",
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
  books: {
    // flexDirection:'column'
  },
});
