import { StyleSheet, Text, View, Pressable } from "react-native";
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
import { AuthContext } from "../../contexts/AuthContext";

export default function AddButton() {
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <Menu>
        <MenuTrigger customStyles={styles.text}>
          <Text style={styles.text}>Add </Text>
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionWrapper: styles.optionWrapper,
          }}
        >
          <MenuOption onSelect={onSearchBook}>
            <Text style={styles.optionText}>Search Book</Text>
            <Ionicons
              name="search-outline"
              size={16}
              color={"black"}
              style={styles.optionIcon}
            />
          </MenuOption>
          <MenuOption onSelect={onScanBook}>
            <Text style={styles.optionText}>Scan Book</Text>
            <MaterialCommunityIcons
              style={styles.optionIcon}
              name="barcode-scan"
              size={16}
              color="black"
            />
          </MenuOption>
          <MenuOption onSelect={onAdddManuallyBook}>
            <Text style={styles.optionText}>Manually Add Book</Text>
            <MaterialCommunityIcons
              name="typewriter"
              size={16}
              color="black"
              style={styles.optionIcon}
            />
          </MenuOption>
          <MenuOption
            onSelect={() => alert(`Delete`)}
            style={styles.menuOption}
          >
            <Text style={styles.optionText}>Add List</Text>
            <FontAwesome5
              name="clipboard-list"
              size={16}
              color="black"
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
    color: "#1F3D35",
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
    // marginLeft: 5,
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
