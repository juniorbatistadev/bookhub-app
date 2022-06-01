import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

function DisplayBook({ title, author, image, pagesRead = 0, pagesTotal }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.cover}
        source={{
          uri: image,
        }}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>{title}</Text>
        <Text style={styles.detailsAuthor}>{author}</Text>
        <Text style={styles.detailsPages}>
          {pagesRead === pagesTotal ? "Finished" : `${pagesRead}/${pagesTotal}`}
        </Text>
        <View style={styles.barBG}>
          <View
            style={{
              ...styles.bar,
              width: `${(pagesRead / pagesTotal) * 100}%`,
            }}
          ></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 26,
  },

  cover: {
    width: 70,
    height: 110,
  },

  detailsContainer: {
    flexDirection: "column",
    marginLeft: 25,
  },

  detailsTitle: {
    color: "#1F3D35",
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
