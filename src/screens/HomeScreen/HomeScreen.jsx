import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Foundation } from "@expo/vector-icons";
import LibraryScreen from "@screens/LibraryScreen/LibraryScreen";
import SearchScreen from "@screens/SearchScreen/SearchScreen";
import AccountScreen from "@screens/AccountScreen/AccountScreen";
import AddButton from "@components/AddButton/AddButton";
import BookEditorScreen from "@screens/BookEditorScreen/BookEditorScreen";
import ScanBookScreen from "@screens/ScanBookScreen/ScanBookScreen";

export default function HomeScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1F3D35",
        tabBarStyle: styles.tabBarStyle,

        headerTitleAlign: "left",
        headerShadowVisible: false,
        headerTitleStyle: styles.title,
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
    color: "#1F3D35",
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
    backgroundColor: "#fff",
    borderTopColor: "#fff",
  },
});
