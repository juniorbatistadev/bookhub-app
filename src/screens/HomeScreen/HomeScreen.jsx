import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Foundation } from "@expo/vector-icons";
import LibraryScreen from "@screens/LibraryScreen/LibraryScreen";
import SearchScreen from "@screens/SearchScreen/SearchScreen";
import AccountScreen from "@screens/AccountScreen/AccountScreen";
import AddButton from "@components/AddButton/AddButton";
import BookEditorScreen from "@screens/BookEditorScreen/BookEditorScreen";
import ScanBookScreen from "@screens/ScanBookScreen/ScanBookScreen";
import { colors, getThemedStyles } from "../../themesStyles";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import { useContext } from "react";
import i18n from "i18n-js";

export default function HomeScreen() {
  const Tab = createBottomTabNavigator();
  const { theme } = useContext(PreferencesContext);
  const { themedHeader, themedContainer } = getThemedStyles(theme.name);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor:
          theme.name === "dark" ? colors.lightGreen : colors.darkGreen,
        tabBarInactiveTintColor: colors.lightGray,
        tabBarStyle: [styles.tabBarStyle, themedContainer],

        headerTitleAlign: "left",
        headerShadowVisible: false,
        headerTitleStyle: { ...styles.title, ...themedHeader },
        headerStyle: styles.header,
      })}
    >
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          headerTitle: i18n.t("library.title"),
          tabBarIcon: ({ color, size }) => (
            <Foundation name="bookmark" size={size} color={color} />
          ),
          headerRight: () => <AddButton />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: i18n.t("search.title"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
        initialParams={{ focusOnSearch: false }}
      />
      <Tab.Screen
        name={i18n.t("account.title")}
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarButton: () => null,
        }}
        name="AddBook"
        component={BookEditorScreen}
      />
      <Tab.Screen
        name="ScanBook"
        options={{
          headerTitle: i18n.t("scanBook.title"),
          tabBarButton: () => null,
        }}
        component={ScanBookScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 29,
    fontFamily: "Jost_700Bold",
  },
  header: {
    height: 130,
  },

  tabBarStyle: {
    elevation: 0,
    borderTopWidth: 0,
  },
});
