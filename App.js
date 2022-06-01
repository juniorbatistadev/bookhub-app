import React, { useCallback, useEffect, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import WelcomeScreen from "@screens/WelcomeScreen/WelcomeScreen";
import {
  Jost_400Regular,
  Jost_500Medium,
  Jost_700Bold,
  useFonts,
} from "@expo-google-fonts/jost";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { AuthContext } from "./src/contexts/AuthContext";

export default function App() {
  const { initializing, currentUser } = useContext(AuthContext);

  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_700Bold,
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();

      if (fontsLoaded && !initializing) {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUser ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
