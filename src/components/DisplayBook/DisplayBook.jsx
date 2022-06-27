import React from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import defaultCover from "@res/images/defaultCover.png";
import { getThemedStyles } from "../../themesStyles";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { PreferencesContext } from "../../contexts/PreferencesContext";

function DisplayBook({ book }) {
  const { theme } = useContext(PreferencesContext);
  const { themedHeader } = getThemedStyles(theme.name);
  const {
    id,
    title,
    authors,
    cover,
    pagesRead = 0,
    totalPages,
    isFinished,
    notes,
  } = book;
  const navigation = useNavigation();

  const onBookPress = () => {
    navigation.push("Home", {
      screen: "AddBook",
      params: {
        book: {
          title: title,
          authors: authors ? authors : null,
          image: cover,
          pages: totalPages,
          pagesRead: pagesRead,
          action: "edit",
          id: id,
          notes: notes,
          isFinished: isFinished,
        },
      },
    });
  };

  return (
    <Pressable onPress={onBookPress}>
      <View style={styles.container}>
        <Image
          style={styles.cover}
          source={cover ? { uri: cover } : defaultCover}
        />
        <View style={styles.detailsContainer}>
          <Text style={[styles.detailsTitle, themedHeader]}>{title}</Text>
          <Text style={styles.detailsAuthor}>
            {authors ? `${authors.join("   ")} ` : "Unknown"}
          </Text>
          <Text style={styles.detailsPages}>
            {isFinished
              ? "Finished"
              : totalPages > 0
              ? `${pagesRead}/${totalPages}`
              : null}
          </Text>
          {Number.parseInt(totalPages) > 0 && (
            <View style={styles.barBG}>
              <View
                style={{
                  ...styles.bar,
                  width: `${(pagesRead / totalPages) * 100}%`,
                }}
              ></View>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 26,
    width: "100%",
  },

  cover: {
    width: 70,
    height: 110,
  },

  detailsContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 25,
  },

  detailsTitle: {
    fontSize: 18,
    fontFamily: "Jost_700Bold",
  },
  detailsAuthor: {
    color: "#BFBFBF",
    fontSize: 14,
    fontFamily: "Jost_400Regular",
    marginTop: 5,
  },
  detailsPages: {
    color: "#BFBFBF",
    fontSize: 14,
    fontFamily: "Jost_400Regular",
    marginTop: 12,
    marginBottom: 5,
  },
  barBG: {
    width: 150,
    height: 7,
    borderRadius: 100,
    backgroundColor: "#e9e9e9",
  },
  bar: {
    height: 7,
    borderRadius: 100,
    backgroundColor: "#63dcb8",
  },
});

export default DisplayBook;
