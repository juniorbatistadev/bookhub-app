import React from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import RenderHtml from "react-native-render-html";
import DefaultCover from "@res/images/defaultCover.png";

function BookResult({ title, authors, image, textSnippet, pages }) {
  const onPress = () => {
    alert(`${title}`);
  };

  return (
    <Pressable onPress={onPress}>
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
          <Text style={styles.detailsTitle}>{title}</Text>
          <Text style={styles.detailsAuthor}>
            {authors ? `${authors.join("   ")} ` : "Unknown"}
          </Text>
          <Text style={styles.detailsPages}>{`${pages || 0} pages`} </Text>
          {/* <RenderHtml
          contentWidth={100}
          source={{ html: textSnippet }}
          tagsStyles={tagsStyles}
        /> */}
          <View style={styles.buttons}>
            {/* <Text style={styles.addBook}>Save Book</Text> */}
            {/* <Text style={styles.moreInfo}>More Info</Text> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const tagsStyles = {
  body: {
    marginTop: 10,
    color: "#BFBFBF",
    fontSize: 14,
    fontFamily: "Jost_400Regular",
  },
  b: {
    fontSize: 12,
    color: "#6a6a6a",
    fontFamily: "Jost_400Regular",
  },
};

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
    color: "#1F3D35",
    fontSize: 19,
    fontFamily: "Jost_500Medium",
  },
  detailsAuthor: {
    color: "#BFBFBF",
    fontSize: 15,
    fontFamily: "Jost_400Regular",
    marginTop: 5,
  },
  buttons: {
    marginTop: 20,
    flexDirection: "row",
  },

  addBook: {
    color: "#1F3D35",
    fontFamily: "Jost_700Bold",
    marginRight: 10,
    fontSize: 14,
  },

  moreInfo: {
    color: "#BFBFBF",
    fontFamily: "Jost_700Bold",
    marginRight: 10,
    fontSize: 14,
  },
  detailsPages: {
    fontSize: 15,
    fontFamily: "Jost_500Medium",
    marginTop: 15,
    color: "#BFBFBF",
  },
});

export default BookResult;
