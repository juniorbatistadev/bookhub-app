import React from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native";
import { colors } from "../../themesStyles";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import firestore from "@react-native-firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CustomModal from "../../components/CustomModal/CustomModal";
import { useEffect } from "react";

function ActionsButtonsEditor({ book }) {
  const scheme = useColorScheme();
  const [showAddToList, setShowAddToList] = useState(false);
  const [selectedList, setSelectedList] = useState("readLater");
  const { currentUser } = useContext(AuthContext);
  const [lists, setLists] = useState([]);

  const handleAdd = async () => {
    const { id, authors, image, isFinished, title } = book;

    //Add to list to book
    await firestore()
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Books")
      .doc(id)
      .update({
        lists: firestore.FieldValue.arrayUnion(selectedList),
      });

    if (selectedList !== "readLater") {
      //Add Book to list
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .collection("Lists")
        .doc(selectedList)
        .update({
          books: firestore.FieldValue.arrayUnion({
            authors,
            cover: image,
            isFinished,
            title,
          }),
        });
    }

    setShowAddToList(false);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Lists")
      .onSnapshot((querySnapshot) => {
        const lists = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setLists(lists);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <CustomModal
        title="Choose List"
        isVisible={showAddToList}
        cancelInfo={{
          text: "Cancel",
          handleCancel: () => setShowAddToList(false),
        }}
        confirmInfo={{
          text: "Add",
          handleConfirm: handleAdd,
        }}
      >
        <Picker
          selectedValue={selectedList}
          onValueChange={(itemValue) => setSelectedList(itemValue)}
          dropdownIconColor={
            scheme === "dark" ? colors.white : colors.darkGreen
          }
          style={{
            width: "100%",
            color: scheme === "dark" ? colors.white : colors.darkGreen,
          }}
        >
          <Picker.Item label="To Read Later" value="readLater" />
          {lists.map((list) => (
            <Picker.Item label={list.listName} value={list.id} key={list.id} />
          ))}
        </Picker>
      </CustomModal>
      <Feather
        name="trash-2"
        size={24}
        color={scheme === "dark" ? colors.white : colors.black}
      />
      <Pressable onPress={() => setShowAddToList(true)}>
        <Entypo
          name="add-to-list"
          size={24}
          color={scheme === "dark" ? colors.white : colors.black}
          style={{ marginLeft: 15 }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 20,
  },
});

export default ActionsButtonsEditor;
