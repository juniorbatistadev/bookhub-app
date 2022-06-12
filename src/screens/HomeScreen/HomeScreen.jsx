import { StyleSheet, useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Foundation } from "@expo/vector-icons";
import LibraryScreen from "@screens/LibraryScreen/LibraryScreen";
import SearchScreen from "@screens/SearchScreen/SearchScreen";
import AccountScreen from "@screens/AccountScreen/AccountScreen";
import AddButton from "@components/AddButton/AddButton";
import BookEditorScreen from "@screens/BookEditorScreen/BookEditorScreen";
import ScanBookScreen from "@screens/ScanBookScreen/ScanBookScreen";
import { colors, getThemedStyles } from "../../themesStyles";

export default function HomeScreen() {
  const Tab = createBottomTabNavigator();
  const scheme = useColorScheme();
  const { themedHeader, themedContainer } = getThemedStyles(scheme);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor:
          scheme === "dark" ? colors.lightGreen : colors.darkGreen,
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
          headerTitle: "Find Books",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
        initialParams={{ focusOnSearch: false }}
      />
      <Tab.Screen
        name="Account"
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
          headerTitle: "Scan Book",
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  tabBarStyle: {
    elevation: 0,
    borderTopWidth: 0,
  },
});
