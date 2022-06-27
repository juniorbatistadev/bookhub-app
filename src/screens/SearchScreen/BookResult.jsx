import React from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import RenderHtml from "react-native-render-html";
import DefaultCover from "@res/images/defaultCover.png";
import { useNavigation } from "@react-navigation/native";
import { getThemedStyles } from "../../themesStyles";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import { useContext } from "react";

function BookResult({
  title,
  authors,
  image,
  textSnippet,
  pages,
  previewOnly,
}) {
  const navigation = useNavigation();
  const { theme } = useContext(PreferencesContext);
  const { themedHeader } = getThemedStyles(theme.name);

  const onPress = () => {
    navigation.push("Home", {
      screen: "AddBook",
      params: {
        book: {
          title,
          authors: authors ? [...authors] : null,
          image,
          textSnippet,
          pages,
        },
      },
    });
  };

  return (
    <Pressable onPress={previewOnly ? null : onPress}>
      <View style={styles.container}>
        {image ? (
          <Image
            style={styles.cover}
            source={{
              uri: image,
            }}
          />
        ) : (
          <Image style={styles.cover} source={DefaultCover} />
        )}

        <View style={styles.detailsContainer}>
          <Text style={[styles.detailsTitle, themedHeader]}>{title}</Text>
          <Text style={styles.detailsAuthor}>
            {authors ? `${authors.join("   ")} ` : "Unknown"}
          </Text>
          <Text style={styles.detailsPages}>{`${pages || 0} pages`} </Text>

          <View style={styles.buttons}></View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 40,
    width: "100%",
  },

  cover: {
    width: 100,
    height: 150,
  },

  detailsContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 25,
  },

  detailsTitle: {
    fontSize: 19,
    fontFamily: "Jost_500Medium",
  },
  detailsAuthor: {
    color: "#BFBFBF",
    fontSize: 15,
    fontFamily: "Jost_400Regular",
    marginTop: 5,
  },

  detailsPages: {
    fontSize: 15,
    fontFamily: "Jost_500Medium",
    marginTop: 15,
    color: "#BFBFBF",
  },
});

export default BookResult;
