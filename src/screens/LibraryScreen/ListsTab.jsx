import { ScrollView } from "react-native";
import DisplayList from "@components/DisplayList/DisplayList";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import i18n from "i18n-js";

function ListsTab() {
  const [lists, setLists] = useState([]);
  const { currentUser } = useContext(AuthContext);

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
    <ScrollView>
      <DisplayList
        name={i18n.t("library.booksYouFinished")}
        id="readList"
        data={{ listName: "Books you've finished" }}
      />
      <DisplayList
        name={i18n.t("library.toReadLater")}
        id="readLater"
        data={{ listName: "To Read Later" }}
      />

      {lists.map((list) => (
        <DisplayList
          key={list.id}
          id={list.id}
          data={list}
          name={list.listName}
        />
      ))}
    </ScrollView>
  );
}

export default ListsTab;
