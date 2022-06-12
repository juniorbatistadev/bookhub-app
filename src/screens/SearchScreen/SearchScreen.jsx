import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useState, useRef } from "react";
import BookResult from "./BookResult";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useSearchBooks from "./useSearchBooks";
import SearchIlustration from "@res/icons/girl.svg";
import { useColorScheme } from "react-native";
import { getThemedStyles } from "../../themesStyles";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const inputElement = useRef(null);
  const { state, searchBooks, loadMoreBooks } = useSearchBooks();
  const scheme = useColorScheme();
  const { themedContainer, themedHeader } = getThemedStyles(scheme);

  const onSubmit = () => {
    searchBooks(search);
  };

  const renderItem = ({ item }) => {
    return (
      <BookResult
        image={item.volumeInfo.imageLinks?.thumbnail}
        title={item.volumeInfo.title}
        authors={item.volumeInfo?.authors}
        textSnippet={item.searchInfo?.textSnippet}
        pages={item.volumeInfo?.pageCount}
      />
    );
  };

  return (
    <View style={[styles.container, themedContainer]}>
      <TextInput
        onChangeText={(text) => setSearch(text)}
        style={styles.input}
        placeholder="Book title, author etc."
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        value={search}
        ref={inputElement}
      />

      <Text style={[styles.title, themedHeader]}>
        {state.textSearched && `Results for "${state.textSearched}" `}
      </Text>

      {state.isLoading ? (
        <ActivityIndicator size={40} />
      ) : state.books ? (
        <FlatList
          style={styles.list}
          data={state.books}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.volumeInfo.title + index}
          onEndReached={() => loadMoreBooks(search)}
          onEndReachedThreshold={10}
        />
      ) : (
        <View style={styles.start}>
          <SearchIlustration
            style={styles.ilustration}
            width={400}
            height={300}
          />
          <Text style={[styles.startText, themedHeader]}>
            Powered By Google
          </Text>
        </View>
      )}
      {state.isLoadingMore && <ActivityIndicator size={30} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  list: {
    padding: 15,
  },

  input: {
    height: 50,
    margin: 15,
    padding: 12,
    borderRadius: 13,
    backgroundColor: "#ebebeb",
    zIndex: 10,
  },

  title: {
    fontSize: 19,
    fontFamily: "Jost_700Bold",
    marginLeft: 14,
    marginTop: 15,
  },

  ilustration: {
    marginTop: 50,
  },

  start: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
  },
  startText: {
    color: "#1F3D35",
    fontSize: 17,
    fontFamily: "Jost_500Medium",
    marginTop: 30,
  },
});
