import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Ionicons, Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { colors, getThemedStyles } from "../../themesStyles";
import CustomModal from "@components/CustomModal/CustomModal";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import firestore from "@react-native-firebase/firestore";

export default function AddButton() {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const { themedHeader, themedContainer, themedText } = getThemedStyles(scheme);
  const [showAddListModal, setShowAddListModal] = useState(false);
  const [listName, setListName] = useState("");
  const { currentUser } = useContext(AuthContext);

  const onSearchBook = () => {
    navigation.replace("Home", {
      screen: "Search",
      params: { focusOnSearch: true },
    });
  };

  const onAdddManuallyBook = () => {
    navigation.push("Home", { screen: "AddBook" });
  };

  const onScanBook = () => {
    navigation.push("Home", { screen: "ScanBook" });
  };

  const onAddList = async () => {
    if (listName.length < 1) {
      Alert.alert("Oops", "Please enter a list name");
      return;
    }

    const listCollection = firestore()
      .collection("Users")
      .doc(currentUser.uid)
      .collection("Lists");

    listCollection.add({ listName }).then(() => {
      setListName("");
      setShowAddListModal(false);
    });
  };

  return (
    <View style={styles.container}>
      <CustomModal
        isVisible={showAddListModal}
        title="Add List"
        cancelInfo={{
          text: "Cancel",
          handleCancel: () => setShowAddListModal(false),
        }}
        confirmInfo={{
          text: "Add",
          handleConfirm: onAddList,
        }}
      >
        <TextInput
          onChangeText={setListName}
          value={listName}
          placeholderTextColor={colors.lightGray}
          placeholder="List Name"
          style={{ width: "100%", marginTop: 10, ...themedText }}
        />
      </CustomModal>
      <Menu>
        <MenuTrigger customStyles={styles.text}>
          <Text style={[styles.text, themedHeader]}>Add </Text>
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionWrapper: [styles.optionWrapper, themedContainer],
          }}
        >
          <MenuOption onSelect={onSearchBook}>
            <Text style={[styles.optionText, themedText]}>Search Book</Text>
            <Ionicons
              name="search-outline"
              size={16}
              color={scheme === "dark" ? colors.white : colors.black}
              style={styles.optionIcon}
            />
          </MenuOption>
          <MenuOption onSelect={onScanBook}>
            <Text style={[styles.optionText, themedText]}>Scan Book</Text>
            <MaterialCommunityIcons
              style={styles.optionIcon}
              name="barcode-scan"
              size={16}
              color={scheme === "dark" ? colors.white : colors.black}
            />
          </MenuOption>
          <MenuOption onSelect={onAdddManuallyBook}>
            <Text style={[styles.optionText, themedText]}>
              Manually Add Book
            </Text>
            <MaterialCommunityIcons
              name="typewriter"
              size={16}
              color={scheme === "dark" ? colors.white : colors.black}
              style={styles.optionIcon}
            />
          </MenuOption>
          <MenuOption
            onSelect={() => setShowAddListModal(true)}
            style={styles.menuOption}
          >
            <Text style={[styles.optionText, themedText]}>Add List</Text>
            <FontAwesome5
              name="clipboard-list"
              size={16}
              color={scheme === "dark" ? colors.white : colors.black}
              style={styles.optionIcon}
            />
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontFamily: "Jost_700Bold",
    marginRight: 20,
  },

  optionWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "black",
  },

  optionText: {
    color: "#1f3d35",
    fontSize: 14,
    fontFamily: "Jost_500Medium",
  },

  // menuOption: {
  //   flex: 1,
  // },

  optionIcon: {
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
    position: "absolute",
    right: 15,

    // alignSelf: "flex-end",
  },
});
