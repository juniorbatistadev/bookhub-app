import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { getThemedStyles } from "../../themesStyles";
import { useColorScheme } from "react-native";
import ListsTab from "./ListsTab";
import BooksTab from "./BooksTab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowListScreen from "./ShowListScreen";

export default function LibraryStackScreen() {
  const LibraryStack = createNativeStackNavigator();

  return (
    <LibraryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LibraryStack.Screen name="LibraryHome" component={LibraryScreen} />
      <LibraryStack.Screen name="ListScreen" component={ShowListScreen} />
    </LibraryStack.Navigator>
  );
}

function LibraryScreen() {
  const [tab, setTab] = useState("books");
  const scheme = useColorScheme();
  const { themedContainer, themedHeader } = getThemedStyles(scheme);

  const handleTabPress = (tab) => {
    setTab(tab);
  };

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
        {tab === "books" && <BooksTab />}
        {tab === "lists" && <ListsTab />}
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
  title: {
    fontSize: 29,
    fontFamily: "Jost_700Bold",
  },
  header: {
    height: 130,
    backgroundColor: "#fff",
  },
});
