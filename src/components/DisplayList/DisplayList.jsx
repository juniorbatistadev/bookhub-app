import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function DisplayList({ name }) {
  const data = [
    {
      title: "Love Does",
      image:
        "https://books.google.com/books/content?id=kRUz8yq4HJUC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73kPYNvNrcU8wD6W8aDCMgikdo6L1s2yUGkyZqWNVIHAQ2WXHnH4VE3NF487G7OzPefytHO7AA_JdkstPNBPFAI20fkhbAa2-FmKQ5pR5qB7aDpwEm09Uazmv_JQyVUcbPKFW87&source=gbs_api",
      author: "Bob Goff",
      pagesRead: 56,
      pagesTotal: 130,
    },
    {
      title: "Twilight",
      image:
        "https://books.google.com/books/content?id=lGjFtMRqp_YC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73SviBoBjlunaHh_JffCjUxSVgdw7fJvRI2QF28vuP_QkufJdoW6bQgDHgzKUEBBoaSjKzonRkpvJkm0WQzfKI0TjK5C_fTQ49c-Jw02smre7DI4OY6y7RSTn410-NneeepuSxk&source=gbs_api",
      author: "Stephenie Meyer",
      pagesRead: 0,
      pagesTotal: 560,
    },
    {
      title: "The Fault in Our Stars",
      image:
        "https://books.google.com/books/content?id=UzqVUdEtLDwC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71NDPRZXxv4ZewxGyqfPWb5Llep27gNbNPrhoY4U8Noj1htIMgM-3xib122NPCyGTn2R76WYKO2CCmEg5LcIZ0DdP4prc1jKdMMkbu82pmuLO3ZRZ-2Na9G1IMnmHpmbtVKiRyd&source=gbs_api",
      author: "John Green",
      pagesRead: 322,
      pagesTotal: 322,
    },
    {
      title: "Love Does",
      image:
        "https://books.google.com/books/content?id=kRUz8yq4HJUC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73kPYNvNrcU8wD6W8aDCMgikdo6L1s2yUGkyZqWNVIHAQ2WXHnH4VE3NF487G7OzPefytHO7AA_JdkstPNBPFAI20fkhbAa2-FmKQ5pR5qB7aDpwEm09Uazmv_JQyVUcbPKFW87&source=gbs_api",
      author: "Bob Goff",
      pagesRead: 56,
      pagesTotal: 130,
    },
    {
      title: "Twilight",
      image:
        "https://books.google.com/books/content?id=lGjFtMRqp_YC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73SviBoBjlunaHh_JffCjUxSVgdw7fJvRI2QF28vuP_QkufJdoW6bQgDHgzKUEBBoaSjKzonRkpvJkm0WQzfKI0TjK5C_fTQ49c-Jw02smre7DI4OY6y7RSTn410-NneeepuSxk&source=gbs_api",
      author: "Stephenie Meyer",
      pagesRead: 0,
      pagesTotal: 560,
    },
    {
      title: "The Fault in Our Stars",
      image:
        "https://books.google.com/books/content?id=UzqVUdEtLDwC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71NDPRZXxv4ZewxGyqfPWb5Llep27gNbNPrhoY4U8Noj1htIMgM-3xib122NPCyGTn2R76WYKO2CCmEg5LcIZ0DdP4prc1jKdMMkbu82pmuLO3ZRZ-2Na9G1IMnmHpmbtVKiRyd&source=gbs_api",
      author: "John Green",
      pagesRead: 322,
      pagesTotal: 322,
    },
    {
      title: "Love Does",
      image:
        "https://books.google.com/books/content?id=kRUz8yq4HJUC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73kPYNvNrcU8wD6W8aDCMgikdo6L1s2yUGkyZqWNVIHAQ2WXHnH4VE3NF487G7OzPefytHO7AA_JdkstPNBPFAI20fkhbAa2-FmKQ5pR5qB7aDpwEm09Uazmv_JQyVUcbPKFW87&source=gbs_api",
      author: "Bob Goff",
      pagesRead: 56,
      pagesTotal: 130,
    },
    {
      title: "Twilight",
      image:
        "https://books.google.com/books/content?id=lGjFtMRqp_YC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73SviBoBjlunaHh_JffCjUxSVgdw7fJvRI2QF28vuP_QkufJdoW6bQgDHgzKUEBBoaSjKzonRkpvJkm0WQzfKI0TjK5C_fTQ49c-Jw02smre7DI4OY6y7RSTn410-NneeepuSxk&source=gbs_api",
      author: "Stephenie Meyer",
      pagesRead: 0,
      pagesTotal: 560,
    },
    {
      title: "The Fault in Our Stars",
      image:
        "https://books.google.com/books/content?id=UzqVUdEtLDwC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71NDPRZXxv4ZewxGyqfPWb5Llep27gNbNPrhoY4U8Noj1htIMgM-3xib122NPCyGTn2R76WYKO2CCmEg5LcIZ0DdP4prc1jKdMMkbu82pmuLO3ZRZ-2Na9G1IMnmHpmbtVKiRyd&source=gbs_api",
      author: "John Green",
      pagesRead: 322,
      pagesTotal: 322,
    },
    {
      title: "Love Does",
      image:
        "https://books.google.com/books/content?id=kRUz8yq4HJUC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73kPYNvNrcU8wD6W8aDCMgikdo6L1s2yUGkyZqWNVIHAQ2WXHnH4VE3NF487G7OzPefytHO7AA_JdkstPNBPFAI20fkhbAa2-FmKQ5pR5qB7aDpwEm09Uazmv_JQyVUcbPKFW87&source=gbs_api",
      author: "Bob Goff",
      pagesRead: 56,
      pagesTotal: 130,
    },
    {
      title: "Twilight",
      image:
        "https://books.google.com/books/content?id=lGjFtMRqp_YC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73SviBoBjlunaHh_JffCjUxSVgdw7fJvRI2QF28vuP_QkufJdoW6bQgDHgzKUEBBoaSjKzonRkpvJkm0WQzfKI0TjK5C_fTQ49c-Jw02smre7DI4OY6y7RSTn410-NneeepuSxk&source=gbs_api",
      author: "Stephenie Meyer",
      pagesRead: 0,
      pagesTotal: 560,
    },
    {
      title: "The Fault in Our Stars",
      image:
        "https://books.google.com/books/content?id=UzqVUdEtLDwC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71NDPRZXxv4ZewxGyqfPWb5Llep27gNbNPrhoY4U8Noj1htIMgM-3xib122NPCyGTn2R76WYKO2CCmEg5LcIZ0DdP4prc1jKdMMkbu82pmuLO3ZRZ-2Na9G1IMnmHpmbtVKiRyd&source=gbs_api",
      author: "John Green",
      pagesRead: 322,
      pagesTotal: 322,
    },
  ];

  const renderItem = ({ item }) => (
    <Image
      style={styles.cover}
      source={{
        uri: item.image,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <AntDesign name="right" size={13} color="#1F3D35" />
      </View>
      <FlatList
        style={styles.list}
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.title + index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
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
    width: 80,
    height: 120,
    marginRight: 10,
  },
});

export default DisplayList;
