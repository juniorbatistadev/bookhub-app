import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../themesStyles";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import firestore from "@react-native-firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CustomModal from "@components/CustomModal/CustomModal";
import { useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import i18n from "i18n-js";

function ActionsButtonsEditor({ book }) {
  const { theme } = useContext(PreferencesContext);
  const [showAddToList, setShowAddToList] = useState(false);
  const [selectedList, setSelectedList] = useState("readLater");
  const { currentUser } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const navigation = useNavigation();

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

  const handleDelete = () => {
    Alert.alert(
      i18n.t("misc.delete"),
      i18n.t("library.deleteBookConfirmation"),
      [
        {
          text: i18n.t("misc.cancel"),
          style: "cancel",
        },
        {
          text: i18n.t("misc.yes"),
          onPress: async () => {
            await firestore()
              .collection("Users")
              .doc(currentUser.uid)
              .collection("Books")
              .doc(book.id)
              .delete();
            navigation.goBack();
          },
        },
      ]
    );
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
        title={i18n.t("library.chooseList")}
        isVisible={showAddToList}
        cancelInfo={{
          text: i18n.t("misc.cancel"),
          handleCancel: () => setShowAddToList(false),
        }}
        confirmInfo={{
          text: i18n.t("misc.add"),
          handleConfirm: handleAdd,
        }}
      >
        <Picker
          selectedValue={selectedList}
          onValueChange={(itemValue) => setSelectedList(itemValue)}
          dropdownIconColor={
            theme.name === "dark" ? colors.white : colors.darkGreen
          }
          style={{
            width: "100%",
            color: theme.name === "dark" ? colors.white : colors.darkGreen,
          }}
        >
          <Picker.Item label={i18n.t("library.readLater")} value="readLater" />
          {lists.map((list) => (
            <Picker.Item label={list.listName} value={list.id} key={list.id} />
          ))}
        </Picker>
      </CustomModal>
      <Pressable onPress={handleDelete}>
        <Feather
          name="trash-2"
          size={24}
          color={theme.name === "dark" ? colors.white : colors.black}
        />
      </Pressable>
      <Pressable onPress={() => setShowAddToList(true)}>
        <Entypo
          name="add-to-list"
          size={24}
          color={theme.name === "dark" ? colors.white : colors.black}
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
